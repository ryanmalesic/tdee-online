import { NextApiRequest, NextApiResponse } from 'next';

import { UserController } from '../../../controllers';
import { withMethods } from '../../../utils/middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { data, error } = await UserController.createUser(req);

  if (error) {
    res.status(error.code).json(error);
    return;
  }

  res.status(201).json(data);
};

export default withMethods(handler, ['POST']);
