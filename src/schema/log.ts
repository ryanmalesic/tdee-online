import * as Yup from 'yup';

import { Log } from '../types';
import { testDate } from '../utils/date';

const LogSchema = Yup.object<Log>({
  date: Yup.string()
    .test('date-valid', 'Date must be in the format yyyy-mm-dd', testDate)
    .required('Date is required'),
  weight: Yup.number().positive('Weight must be a positive value').required('Weight is required'),
  caloricIntake: Yup.number()
    .integer('Caloric intake must be an integer value')
    .min(0, 'Caloric intake must greater than or equal to 0')
    .required('Caloric intake is required')
});

export default LogSchema;
