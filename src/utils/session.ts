import { NextApiHandler } from 'next';
import { withIronSession } from 'next-iron-session';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'tdee-online/iron-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  });
}
