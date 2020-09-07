import * as Yup from 'yup';

import { Sex, User } from '../types';
import { testDate } from '../utils/date';

const UserSchema = Yup.object<User>({
  firstName: Yup.string().required('First name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  birthdate: Yup.string()
    .test('date-valid', 'Date must be in the format yyyy-mm-dd', testDate)
    .required('Birthdate is required'),
  sex: Yup.string().oneOf([Sex.Male, Sex.Female]).required('Sex is required')
});

export default UserSchema;
