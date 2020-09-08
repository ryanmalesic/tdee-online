import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withIronSession } from 'next-iron-session';

export const withMethods = (handler: NextApiHandler, methods: string[]) => (
  req: NextApiRequest,
  res: NextApiResponse
): void | Promise<void> => {
  if (methods.includes(req.method)) {
    return handler(req, res);
  } else {
    const error = {
      code: 405,
      description: 'Method not allowed',
      message: `Method ${req.method} at path ${req.url} is not allowed`
    };

    res.status(error.code).json(error);
    return;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withSession = (handler: NextApiHandler) => {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'tdee-online/iron-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  });
};
