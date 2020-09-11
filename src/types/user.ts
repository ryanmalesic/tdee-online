import { Sex } from '.';

type User = {
  id?: string;
  firstName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  birthdate: string;
  sex: Sex;
};

export default User;
