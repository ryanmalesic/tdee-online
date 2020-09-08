import { NextApiResponse } from 'next';

import { NextApiRequsetWithSession } from '../../types/req';
import { withMethods, withSession } from '../../utils/middleware';

const handler = async (req: NextApiRequsetWithSession, res: NextApiResponse): Promise<void> => {
  req.session.destroy('user');
  await req.session.save();

  res.status(205).json(null);
};

export default withSession(withMethods(handler, ['POST']));
