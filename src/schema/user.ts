import Joi from 'joi';

import { Sex, User } from '../types';
import { getEnumValues } from '../utils/enum';

const UserSchema: Joi.ObjectSchema<User> = Joi.object({
  firstName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref('password'),
  birthdate: Joi.date().required(),
  sex: Joi.string().valid(...getEnumValues(Sex))
}).with('password', 'confirmPassword');

export default UserSchema;
