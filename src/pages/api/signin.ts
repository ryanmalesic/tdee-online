import { NextApiResponse } from 'next';

import { UserController } from '../../controllers';
import { NextApiRequsetWithSession } from '../../types/req';
import { withMethods, withSession } from '../../utils/middleware';

const handler = async (req: NextApiRequsetWithSession, res: NextApiResponse): Promise<void> => {
  const { data, error } = await UserController.validateUserCredentials(req);

  if (error) {
    res.status(error.code).json(error);
    return;
  }

  req.session.set('user', data.id);
  await req.session.save();

  res.status(201).json(data);
};

export default withSession(withMethods(handler, ['POST']));
