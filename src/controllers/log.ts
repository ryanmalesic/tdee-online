import _ from 'lodash';
import { NextApiRequest } from 'next';
import { ValidationError } from 'yup';

import rds from '../database';
import { LogSchema } from '../schema';
import { ApiError, Log } from '../types';
import { isApiError } from '../types/apiError';

const LogController = {
  createLog: async (
    req: NextApiRequest & { session: any }
  ): Promise<{ log?: Log; error?: ApiError }> => {
    const userId = req.session.get('user');

    if (!userId) {
      return {
        error: { code: 401, message: 'Unauthorized', description: 'You are not logged in!' }
      };
    }

    const validated: Log | ApiError = await LogSchema.validate(req.body).catch(
      (err: ValidationError) => {
        return { code: 422, message: 'Unprocessable Entity', errors: err.errors };
      }
    );

    if (isApiError(validated)) {
      return { error: validated };
    }

    const data: { insertId: string } | ApiError = await rds
      .query(
        `
          INSERT INTO logs (date, weight, caloric_intake, user_id)
            VALUES (:date, :weight, :caloricIntake, :userId)
            ON DUPLICATE KEY UPDATE
                weight = :weight,
                caloric_intake = :caloricIntake;
          `,
        { ...validated, userId }
      )
      .catch((err) => {
        return { code: 500, message: 'Internal Server Error', description: err.message };
      });

    if (isApiError(data)) {
      return { error: data };
    }

    const newLog: Log = { id: data.insertId, ...validated, userId };

    return { log: newLog };
  },
  getToday: async (
    req: NextApiRequest & { session: any }
  ): Promise<{ log?: Log; error?: ApiError }> => {
    const userId = req.session.get('user');

    if (!userId) {
      return {
        error: { code: 401, message: 'Unauthorized', description: 'You are not logged in!' }
      };
    }

    const data: ApiError | any = await rds
      .query(`SELECT * FROM logs WHERE date = :date AND user_id = :userId;`, {
        date: new Date().toISOString().slice(0, 10),
        userId
      })
      .catch((err) => {
        return { code: 500, message: 'Internal Server Error', description: err.message };
      });

    if (isApiError(data)) {
      return { error: data };
    }

    if (data.records.length === 0) {
      return {
        error: { code: 404, message: 'Not Found', description: 'Log does not exist' }
      };
    }

    const log: Log = _.mapKeys(data.records[0], (_value, key) => {
      return _.camelCase(key);
    }) as Log;

    return { log };
  }
};

export default LogController;
