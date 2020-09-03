import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { NextApiRequest } from 'next';

import Database from '../database';
import { User } from '../entities';
import { ApiError } from '../types';

const UserController = {
  createUser: async (req: NextApiRequest): Promise<{ user?: User; error?: ApiError }> => {
    try {
      const database = new Database();
      const connection = await database.getConnection();

      const user = await connection
        .getRepository(User)
        .save({ ...req.body, password: await hash(req.body.password, 10) });

      return { user };
    } catch (err) {
      if (
        err.name === 'BadRequestException' &&
        (err.message as string).startsWith('Duplicate entry')
      ) {
        return {
          error: {
            code: 409,
            message: `Email address ${req.body.email} is already taken.`,
            description: err
          }
        };
      }

      return { error: { code: 500, message: 'Internal Server Error', description: err } };
    }
  },
  validateUserCredentials: async (
    req: NextApiRequest
  ): Promise<{ user?: Partial<User>; error?: ApiError }> => {
    const { email, password } = req.body;

    try {
      const database = new Database();
      const connection = await database.getConnection();

      const user = await connection.getRepository(User).findOne({ where: { email } });

      if (!user) {
        return {
          error: {
            code: 401,
            message: 'Unauthorized',
            description: 'The credentials provided are not valid'
          }
        };
      }

      const passwordsMatch = await compare(password, user?.password);

      if (!passwordsMatch) {
        return {
          error: {
            code: 401,
            message: 'Unauthorized',
            description: 'The credentials provided are not valid'
          }
        };
      }

      return { user: _.omit(user, 'password') };
    } catch (err) {
      return { error: { code: 500, message: 'Internal Server Error', description: err } };
    }
  }
};

export default UserController;
