import { compare } from 'bcrypt';

import { Errorable, User } from '../types';
import { NextApiRequsetWithSession } from '../types/req';

export function getUserFromSession(req: NextApiRequsetWithSession): Errorable<string> {
  const userId = req.session.get('user');

  if (!userId) {
    return {
      error: { code: 401, message: 'Unauthorized', description: 'You are not logged in!' }
    };
  }

  return { data: userId };
}

export async function validateUserPassword(
  user: User,
  password: string
): Promise<Errorable<boolean>> {
  try {
    return { data: await compare(password, user.password) };
  } catch {
    return {
      error: {
        code: 401,
        message: 'Unauthorized',
        description: 'The provided credentials are not valid'
      }
    };
  }
}
