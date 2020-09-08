import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { NextApiRequest } from 'next';
import { ValidationError } from 'yup';

import rds from '../database';
import { UserSchema } from '../schema';
import { ApiError, User } from '../types';
import { isApiError } from '../types/apiError';
import { getWeekEnd, getWeekStart } from '../utils/date';

const UserController = {
  createUser: async (req: NextApiRequest): Promise<{ user?: User; error?: ApiError }> => {
    const validated: User | ApiError = await UserSchema.validate(req.body).catch(
      (err: ValidationError) => {
        return { code: 422, message: 'Unprocessable Entity', errors: err.errors };
      }
    );

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
          VALUES (:firstName, :email, :password, :birthdate, :sex);
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
      .query(`SELECT * FROM users WHERE id = :id;`, { id })
      .catch((err) => {
        return { code: 500, message: 'Internal Server Error', description: err.message };
      });

    if (isApiError(data)) {
      return { error: data };
    }

    if (data.records.length === 0) {
      return {
        error: { code: 401, message: 'Unauthorized', description: 'You are not logged in!' }
      };
    }

    const user: User = data.records[0];

    return { user: _.omit(user, 'password') };
  },
  getUserTdee: async (
    req: NextApiRequest & { session: any }
  ): Promise<{ tdee?: number; error?: ApiError }> => {
    const id = req.session.get('user');

    if (!id) {
      return {
        error: { code: 401, message: 'Unauthorized', description: 'You are not logged in!' }
      };
    }

    const data: ApiError | any = await rds
      .query(
        `(
            SELECT MIN(date) as firstLogDate, AVG(weight) as averageWeight, AVG(caloric_intake) as averageCaloricIntake
              FROM logs WHERE user_id = :userId
              AND (date BETWEEN :lastWeekStart AND :lastWeekEnd)
          ) UNION (
            SELECT MIN(date) as firstLogDate, AVG(weight) as averageWeight, AVG(caloric_intake) as averageCaloricIntake
              FROM logs WHERE user_id = :userId
              AND (date BETWEEN :currentWeekStart AND :currentWeekEnd)
          ) ORDER BY firstLogDate;`,
        {
          userId: id,
          lastWeekStart: getWeekStart(-1),
          lastWeekEnd: getWeekEnd(-1),
          currentWeekStart: getWeekStart(),
          currentWeekEnd: getWeekEnd()
        }
      )
      .catch((err) => {
        return { code: 500, message: 'Internal Server Error', description: err.message };
      });

    if (isApiError(data)) {
      return { error: data };
    }

    if (data.records[0].firstLogDate === null) {
      return {
        error: {
          code: 404,
          message: 'Not Found',
          description: 'Not enough data to calculate the TDEE'
        }
      };
    }

    const deltaWeight = data.records[1].averageWeight - data.records[0].averageWeight;

    return { tdee: data.records[1].averageCaloricIntake - deltaWeight * 500 };
  },
  validateUserCredentials: async (
    req: NextApiRequest
  ): Promise<{ user?: User; error?: ApiError }> => {
    const { email, password } = req.body;

    const data = await rds
      .query(`SELECT * FROM users WHERE email = :email;`, { email })
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
