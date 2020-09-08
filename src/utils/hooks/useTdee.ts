import useSWR, { responseInterface } from 'swr';

import { Tdee, User } from '../../types';

const useLogToday = (user: User): responseInterface<Tdee, Error> => {
  const { data, error, isValidating, revalidate, mutate } = useSWR<Tdee, Error>(
    user && '/api/users/me/tdee',
    {
      shouldRetryOnError: false
    }
  );

  return { data, error, isValidating, mutate, revalidate };
};

export default useLogToday;
