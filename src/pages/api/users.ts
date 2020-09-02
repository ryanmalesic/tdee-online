import { NextApiRequest, NextApiResponse } from 'next';

import { UserController } from '../../controllers';
import { User } from '../../entities';
import { withEntitiyValidation, withMethods } from '../../utils/middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method == 'POST') {
    const { user, error } = await UserController.createUser(req);

    if (error) {
      res.status(error.code).json(error);
    } else {
      res.status(201).json(user);
    }
  }
};

export default withMethods(withEntitiyValidation(handler, User), ['POST']);
