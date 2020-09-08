type Error = {
  code: number;
  message: string;
  description?: string;
  errors?: string[];
};

type Errorable<T> = { data?: T; error?: Error };

export default Errorable;
