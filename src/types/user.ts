import { Sex } from '.';

type User = {
  id: string;
  firstName: string;
  email: string;
  password?: string;
  birtdate: string;
  sex: Sex;
};

export default User;
