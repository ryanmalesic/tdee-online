import { NextApiRequest } from 'next';

export type NextApiRequsetWithSession = NextApiRequest & { session: any };
