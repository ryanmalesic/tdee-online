import useSWR, { responseInterface } from 'swr';

import { Log, User } from '../../types';

const useLogToday = (user: User): responseInterface<Log, Error> => {
  const { data, error, isValidating, revalidate, mutate } = useSWR<Log, Error>(
    user && '/api/logs/today',
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false
    }
  );

  return { data, error, isValidating, mutate, revalidate };
};

export default useLogToday;
