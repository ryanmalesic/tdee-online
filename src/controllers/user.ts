import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { NextApiRequest } from 'next';

import rds from '../database';
import { UserSchema } from '../schema';
import { ApiError, User } from '../types';
import { isApiError } from '../types/apiError';

const UserController = {
  createUser: async (req: NextApiRequest): Promise<{ user?: User; error?: ApiError }> => {
    const validated: User | ApiError = await UserSchema.validateAsync(req.body).catch((err) => {
      return { code: 422, message: 'Unprocessable Entity', description: err.message };
    });

    if (isApiError(validated)) {
      return { error: validated };
    }

    const queryParams = {
      ..._.omit(validated, 'confirmPassword'),
      password: await hash(validated.password, 10)
    };

    const data: { insertId: string } | ApiError = await rds
      .query(
        `
        INSERT INTO users (first_name, email, password, birthdate, sex)
          VALUES (:firstName, :email, :password, :birthdate, :sex
        );
        `,
        queryParams
      )
      .catch((err) => {
        if (
          err.name === 'BadRequestException' &&
          (err.message as string).startsWith('Duplicate entry')
        ) {
          return {
            code: 409,
            message: 'Conflict',
            description: `Email address ${validated.email} is already taken.`
          };
        }

        return { code: 500, message: 'Internal Server Error', description: err.message };
      });

    if (isApiError(data)) {
      return { error: data };
    }

    const newUser: User = { id: data.insertId, ...validated };

    return { user: _.omit(newUser, ['password', 'confirmPassword']) as User };
  },
  getUser: async (
    req: NextApiRequest & { session: any }
  ): Promise<{ user?: Partial<User>; error?: ApiError }> => {
    const id = req.session.get('user');

    if (!id) {
      return {
        error: { code: 401, message: 'Unauthorized', description: 'You are not logged in!' }
      };
    }

    const data: ApiError | any = await rds
      .query(`SELECT * FROM users WHERE id = :id`, { id })
      .catch((err) => {
        return { code: 500, message: 'Internal Server Error', description: err.message };
      });

    if (isApiError(data)) {
      return { error: data };
    }

    const user: User = data.records[0];

    if (!user) {
      return {
        error: { code: 401, message: 'Unauthorized', description: 'You are not logged in!' }
      };
    }

    return { user: _.omit(user, 'password') };
  },
  validateUserCredentials: async (
    req: NextApiRequest
  ): Promise<{ user?: User; error?: ApiError }> => {
    const { email, password } = req.body;

    const data = await rds
      .query(`SELECT * FROM users WHERE email = :email`, { email })
      .catch((err) => {
        return { code: 500, message: 'Internal Server Error', description: err.message };
      });

    if (isApiError(data)) {
      return { error: data };
    }

    const user: User = data.records[0];

    if (!user) {
      return {
        error: {
          code: 401,
          message: 'Unauthorized',
          description: 'The provided credentials are not valid'
        }
      };
    }

    const passwordsMatch: boolean | ApiError = await compare(password, user.password).catch(() => {
      return {
        code: 401,
        message: 'Unauthorized',
        description: 'The provided credentials are not valid'
      };
    });

    if (isApiError(passwordsMatch)) {
      return { error: passwordsMatch };
    }

    return { user: _.omit(user, 'password') };
  }
};

export default UserController;
