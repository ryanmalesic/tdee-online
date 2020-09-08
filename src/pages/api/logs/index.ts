import { NextApiResponse } from 'next';

import { LogController } from '../../../controllers';
import { NextApiRequsetWithSession } from '../../../types/req';
import { withMethods, withSession } from '../../../utils/middleware';

const handler = async (req: NextApiRequsetWithSession, res: NextApiResponse): Promise<void> => {
  const { data, error } = await LogController.createLog(req);

  if (error) {
    res.status(error.code).json(error);
    return;
  }

  res.status(201).json(data);
};

export default withSession(withMethods(handler, ['POST']));
