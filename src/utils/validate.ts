/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import * as Yup from 'yup';

import { Errorable } from '../types';

export async function validatePayload<T extends object>(
  schema: Yup.ObjectSchema<T>,
  payload: any
): Promise<Errorable<T>> {
  try {
    return { data: await schema.validate(payload) };
  } catch (err) {
    return { error: { code: 422, message: 'Unprocessable Entity', errors: err.errors } };
  }
}
