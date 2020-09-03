import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validateOrReject } from 'class-validator';
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

export function withEntitiyValidation<T>(handler: NextApiHandler, cls: ClassType<T>) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const obj: T = plainToClass(cls, req.body);

    try {
      await validateOrReject(obj);
      return handler(req, res);
    } catch (err) {
      const error: ApiError = { code: 422, message: 'Unprocessable entity', description: err };

      res.status(error.code).json(error);
      return;
    }
  };
}
