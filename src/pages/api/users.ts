import { NextApiRequest, NextApiResponse } from 'next';

import { UserController } from '../../controllers';
import { ApiError } from '../../types';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method == 'POST') {
    const { user, error } = await UserController.createUser(req);

    if (error) {
      res.status(error.code).json(error);
    } else {
      res.status(201).json(user);
    }
  } else {
    const error: ApiError = {
      code: 405,
      description: 'Method not allowed',
      message: `Method ${req.method} at path ${req.url} is not allowed`
    };

    res.status(error.code).json(error);
  }
};
