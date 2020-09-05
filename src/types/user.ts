import { Sex } from '.';

type IUser = {
  userId: string;
  firstName: string;
  email: string;
  password?: string;
  birtdate: string;
  sex: Sex;
};

export default IUser;
