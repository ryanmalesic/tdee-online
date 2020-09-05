import { NextApiRequest, NextApiResponse } from 'next';

import { UserController } from '../../../controllers';
import { withMethods } from '../../../utils/middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { user, error } = await UserController.createUser(req);

  if (error) {
    res.status(error.code).json(error);
  } else {
    res.status(201).json(user);
  }
};

export default withMethods(handler, ['POST']);
