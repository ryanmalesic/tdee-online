import Router from 'next/router';
import { useEffect } from 'react';
import useSWR, { responseInterface } from 'swr';

import { User } from '../../types';

export interface useUserProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

const useUser = ({ redirectTo, redirectIfFound }: useUserProps = {}): responseInterface<
  User,
  Error
> => {
  const { data, error, isValidating, revalidate, mutate } = useSWR<User, Error>('/api/users/me', {
    shouldRetryOnError: false
  });

  useEffect(() => {
    if (!redirectTo) {
      return;
    }

    if (
      (redirectTo && !redirectIfFound && error) ||
      (redirectTo && redirectIfFound && data && !error)
    ) {
      Router.push(redirectTo);
    }
  }, [data, error, redirectIfFound, redirectTo]);

  return { data, error, isValidating, mutate, revalidate };
};

export default useUser;
