import Router from 'next/router';
import { useEffect } from 'react';
import useSWR, { responseInterface } from 'swr';

import { IUser } from '../../types';

export interface useUserProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

const useUser = ({ redirectTo, redirectIfFound }: useUserProps = {}): responseInterface<
  IUser,
  Error
> => {
  const { data, error, isValidating, revalidate, mutate } = useSWR<IUser, Error>('/api/users/me');

  useEffect(() => {
    if (!redirectTo) {
      return;
    }

    if (
      (redirectTo && !redirectIfFound && !data && error) ||
      (redirectTo && redirectIfFound && data && !error)
    ) {
      Router.push(redirectTo);
    }
  }, [data, error, redirectIfFound, redirectTo]);

  return { data, error, isValidating, mutate, revalidate };
};

export default useUser;
