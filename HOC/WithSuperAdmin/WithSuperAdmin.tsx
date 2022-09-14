import { useRouter } from 'next/router';
import React, { ComponentType } from 'react';
import { isTokenExpired } from '../../util/tokenutil';

const withAuthentication = <P extends object>(
  WrappedComponent: ComponentType<P>
  ) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const accessToken =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      if (!accessToken) {
        router.replace('/login');
        return null;
      }

      if (isTokenExpired(accessToken)) {
        localStorage.removeItem('token');
        router.replace('/login');
        return null;
      }

      // if(!isSuperAdmin(accessToken)) {
      //     router.replace("/privilege");
      //     return null;
      // }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuthentication;
