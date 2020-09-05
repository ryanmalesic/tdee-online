import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { ApiError } from '../types';

export const withMethods = (handler: NextApiHandler, methods: string[]) => (
  req: NextApiRequest,
  res: NextApiResponse
): void | Promise<void> => {
  if (methods.includes(req.method)) {
    return handler(req, res);
  } else {
    const error: ApiError = {
      code: 405,
      description: 'Method not allowed',
      message: `Method ${req.method} at path ${req.url} is not allowed`
    };

    res.status(error.code).json(error);
    return;
  }
};
