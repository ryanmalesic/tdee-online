import { NextApiRequest, NextApiResponse } from 'next';

import { withMethods } from '../../utils/middleware';
import withSession from '../../utils/session';

const handler = async (
  req: NextApiRequest & { session: any },
  res: NextApiResponse
): Promise<void> => {
  req.session.destroy('user');
  await req.session.save();

  res.status(205).json(null);
};

export default withSession(withMethods(handler, ['POST']));
