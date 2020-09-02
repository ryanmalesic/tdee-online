import { hash } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { NextApiRequest } from 'next';

import Database from '../database';
import { User } from '../entities';
import { ApiError } from '../types';

const UserController = {
  createUser: async (req: NextApiRequest): Promise<{ user?: User; error?: ApiError }> => {
    const newUser: User = plainToClass(User, req.body);

    try {
      await validateOrReject(newUser);
    } catch (err) {
      console.log(err);
      return { error: { code: 422, message: 'Unprocessable entity', description: err } };
    }

    try {
      const database = new Database();
      console.log(database);
      const connection = await database.getConnection();
      console.log(connection);
      const user = await connection
        .getRepository(User)
        .save({ ...newUser, password: await hash(newUser.password, 10) });

      return { user };
    } catch (err) {
      console.log(err);

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
  }
};

export default UserController;
