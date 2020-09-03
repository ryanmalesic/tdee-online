import { NextApiRequest, NextApiResponse } from 'next';

import { UserController } from '../../controllers';
import { withMethods } from '../../utils/middleware';
import withSession from '../../utils/session';

const handler = async (
  req: NextApiRequest & { session: any },
  res: NextApiResponse
): Promise<void> => {
  const { user, error } = await UserController.validateUserCredentials(req);

  if (error) {
    res.status(error.code).json(error);
  } else {
    req.session.set('user', user);
    await req.session.save();

    res.status(201).json(user);
  }
};

export default withSession(withMethods(handler, ['POST']));
