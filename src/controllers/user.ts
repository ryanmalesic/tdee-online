import { hash } from 'bcrypt';
import _ from 'lodash';
import { NextApiRequest } from 'next';

import { UserSchema } from '../schema';
import { Errorable, Tdee, User } from '../types';
import { NextApiRequsetWithSession } from '../types/req';
import { getWeekEnd, getWeekStart } from '../utils/date';
import { queryRds } from '../utils/query';
import { getUserFromSession, validateUserPassword } from '../utils/user';
import { validatePayload } from '../utils/validate';

const UserController = {
  createUser: async (req: NextApiRequest): Promise<Errorable<User>> => {
    const { data: validated, error: validatePayloadError } = await validatePayload<User>(
      UserSchema,
      req.body
    );

    if (validatePayloadError) {
      return { error: validatePayloadError };
    }

    const parameters = {
      ..._.omit(validated, 'confirmPassword'),
      password: await hash(validated.password, 10)
    };

    const { data: response, error: queryRdsError } = await queryRds(
      `
    INSERT INTO users (first_name, email, password, birthdate, sex)
      VALUES (:firstName, :email, :password, :birthdate, :sex);
    `,
      parameters
    );

    if (queryRdsError) {
      if (queryRdsError.message.startsWith('Duplicate entry')) {
        return {
          error: {
            code: 409,
            message: 'Conflict',
            description: `Email address ${validated.email} is already taken.`
          }
        };
      }
      return { error: queryRdsError };
    }

    const newUser: User = { id: response.insertId, ...validated };
    const newUserWithoutPasswords = _.omit(newUser, ['password', 'confirmPassword']) as User;

    return { data: newUserWithoutPasswords };
  },
  getUser: async (req: NextApiRequsetWithSession): Promise<Errorable<User>> => {
    const { data: userId, error: getUserFromSessionError } = getUserFromSession(req);

    if (getUserFromSessionError) {
      return { error: getUserFromSessionError };
    }

    const { data: response, error: queryRdsError } = await queryRds<User>(
      `SELECT * FROM users WHERE id = :userId;`,
      { userId }
    );

    if (queryRdsError) {
      return { error: queryRdsError };
    }

    if (response.records.length === 0) {
      return {
        error: { code: 401, message: 'Unauthorized', description: 'You are not logged in!' }
      };
    }

    const user: User = response.records[0];
    const userWithoutPassword = _.omit(user, 'password');

    return { data: userWithoutPassword };
  },
  getUserTdee: async (req: NextApiRequsetWithSession): Promise<Errorable<Tdee>> => {
    const { data: userId, error: getUserFromSessionError } = getUserFromSession(req);

    if (getUserFromSessionError) {
      return { error: getUserFromSessionError };
    }

    type Response = {
      firstLogDate: string;
      averageWeight: number;
      averageCaloricIntake: number;
    };

    const { data: response, error: queryRdsError } = await queryRds<Response>(
      `(
        SELECT MIN(date) as firstLogDate, AVG(weight) as averageWeight, AVG(caloric_intake) as averageCaloricIntake
          FROM logs WHERE user_id = :userId
          AND (date BETWEEN :lastWeekStart AND :lastWeekEnd)
      ) UNION (
        SELECT MIN(date) as firstLogDate, AVG(weight) as averageWeight, AVG(caloric_intake) as averageCaloricIntake
          FROM logs WHERE user_id = :userId
          AND (date BETWEEN :currentWeekStart AND :currentWeekEnd)
      ) ORDER BY firstLogDate;`,
      {
        userId,
        lastWeekStart: getWeekStart(-1),
        lastWeekEnd: getWeekEnd(-1),
        currentWeekStart: getWeekStart(),
        currentWeekEnd: getWeekEnd()
      }
    );

    if (queryRdsError) {
      return { error: queryRdsError };
    }

    if (response.records[0].firstLogDate === null) {
      return {
        error: {
          code: 404,
          message: 'Not Found',
          description: 'Not enough data to calculate the TDEE'
        }
      };
    }

    const deltaWeight = response.records[1].averageWeight - response.records[0].averageWeight;

    return { data: { tdee: response.records[1].averageCaloricIntake - deltaWeight * 500 } };
  },
  validateUserCredentials: async (req: NextApiRequest): Promise<Errorable<User>> => {
    const { email, password } = req.body;

    const { data: response, error: queryRdsError } = await queryRds<User>(
      `SELECT * FROM users WHERE email = :email;`,
      { email }
    );

    if (queryRdsError) {
      return { error: queryRdsError };
    }

    if (response.records.length === 0) {
      return {
        error: {
          code: 401,
          message: 'Unauthorized',
          description: 'The provided credentials are not valid'
        }
      };
    }

    const user: User = response.records[0];

    const { error: validateUserPasswordError } = await validateUserPassword(user, password);

    if (validateUserPasswordError) {
      return { error: validateUserPasswordError };
    }

    const userWithoutPassword = _.omit(user, 'password');

    return { data: userWithoutPassword };
  }
};

export default UserController;
