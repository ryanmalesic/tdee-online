import { hash } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { NextApiRequest } from 'next';

import Database from '../database';
import { User } from '../entities';
import { ApiError } from '../types';

const UserController = {
  createUser: async (req: NextApiRequest): Promise<{ user?: User; error?: ApiError }> => {
    const user: User = plainToClass(User, req.body);

    try {
      await validateOrReject(user);
    } catch (err) {
      return { error: { code: 422, message: 'Unprocessable entity', description: err } };
    }

    const connection = await Database.fetchConnection();
    await connection.getRepository(User).save({ ...user, password: await hash(user.password, 10) });

    return { user };
  }
};

export default UserController;
