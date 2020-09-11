import _ from 'lodash';

import { LogSchema } from '../schema';
import { Errorable, Log } from '../types';
import { NextApiRequsetWithSession } from '../types/req';
import { queryRds } from '../utils/query';
import { getUserFromSession } from '../utils/user';
import { validatePayload } from '../utils/validate';

const LogController = {
  createLog: async (req: NextApiRequsetWithSession): Promise<Errorable<Log>> => {
    const { data: userId, error: getUserFromSessionError } = getUserFromSession(req);

    if (getUserFromSessionError) {
      return { error: getUserFromSessionError };
    }

    const { data: validated, error: validatePayloadError } = await validatePayload<Log>(
      LogSchema,
      req.body
    );

    if (validatePayloadError) {
      return { error: validatePayloadError };
    }

    const { data: response, error: queryRdsError } = await queryRds(
      `
      INSERT INTO logs (date, weight, caloric_intake, user_id)
      VALUES (:date, :weight, :caloricIntake, :userId)
      ON DUPLICATE KEY UPDATE
          weight = :weight,
          caloric_intake = :caloricIntake;
    `,
      { ...validated, userId }
    );

    if (queryRdsError) {
      return { error: queryRdsError };
    }

    const log: Log = { id: response.insertId, ...validated, userId };

    return { data: log };
  },
  getToday: async (req: NextApiRequsetWithSession): Promise<Errorable<Log>> => {
    const { data: userId, error: getUserFromSessionError } = getUserFromSession(req);

    if (getUserFromSessionError) {
      return { error: getUserFromSessionError };
    }

    const { data: response, error: queryRdsError } = await queryRds<Log>(
      `SELECT * FROM logs WHERE date = :date AND user_id = :userId;`,
      {
        date: new Date().toISOString().slice(0, 10),
        userId
      }
    );

    if (queryRdsError) {
      return { error: queryRdsError };
    }

    if (response.records.length === 0) {
      return {
        error: { code: 404, message: 'Not Found', description: 'Log does not exist' }
      };
    }

    const log: Log = _.mapKeys(response.records[0], (_value, key) => {
      return _.camelCase(key);
    }) as Log;

    return { data: log };
  }
};

export default LogController;
