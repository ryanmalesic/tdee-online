/* eslint-disable @typescript-eslint/ban-types */

import rds from '../database';
import { Errorable, RdsResponse } from '../types';

export async function queryRds<T>(
  sql: string,
  parameters: object
): Promise<Errorable<RdsResponse<T>>> {
  try {
    return { data: await rds.query(sql, parameters) };
  } catch (err) {
    return { error: { code: 500, message: 'Internal Server Error', description: err.message } };
  }
}
