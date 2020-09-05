import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { NextApiRequest } from 'next';

import rds from '../database';
import { ApiError, User } from '../types';

const UserController = {
  createUser: async (req: NextApiRequest): Promise<{ user?: User; error?: ApiError }> => {
    try {
      const data = await rds.query(
        `INSERT INTO users (first_name, email, password, birthdate, sex) VALUES (:firstName, :email, :password, :birthdate, :sex)`,
        { ...req.body, password: await hash(req.body.password, 10) }
      );

      const user: User = { id: data.insertId, ...req.body };
      return { user: _.omit(user, 'password') };
    } catch (err) {
      if (
        err.name === 'BadRequestException' &&
        (err.message as string).startsWith('Duplicate entry')
      ) {
        return {
          error: {
            code: 409,
            message: 'Conflict',
            description: `Email address ${req.body.email} is already taken.`
          }
        };
      }

      return { error: { code: 500, message: 'Internal Server Error', description: err.message } };
    }
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

    try {
      const data = await rds.query(`SELECT * FROM users WHERE id = :id`, { id });
      const user: User = data.records[0];

      if (!user) {
        return {
          error: { code: 401, message: 'Unauthorized', description: 'You are not logged in!' }
        };
      }

      return { user: _.omit(user, 'password') };
    } catch (err) {
      return { error: { code: 500, message: 'Internal Server Error', description: err.message } };
    }
  },
  validateUserCredentials: async (
    req: NextApiRequest
  ): Promise<{ user?: User; error?: ApiError }> => {
    const { email, password } = req.body;

    try {
      const data = await rds.query(`SELECT * FROM users WHERE email = :email`, { email });
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

      const passwordsMatch = await compare(password, user.password);

      if (!passwordsMatch) {
        return {
          error: {
            code: 401,
            message: 'Unauthorized',
            description: 'The provided credentials are not valid'
          }
        };
      }

      return { user: _.omit(user, 'password') };
    } catch (err) {
      return { error: { code: 500, message: 'Internal Server Error', description: err.message } };
    }
  }
};

export default UserController;
