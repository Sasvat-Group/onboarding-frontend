import { useRouter } from 'next/router';
import { ComponentType, useState } from 'react';
import { connect } from 'react-redux';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import { isSuperAdmin, isTokenExpired } from '../../util/tokenutil';
import { RootState } from '../../store';

const withAuthAndPermission = <P extends object>(
  WrappedComponent: ComponentType<P>,
  module: Modules,
  permission: Permissions
) => {
  const mapStateToProps = (state: RootState) => {
    return {
      userPermissions: state.user.userPermissions,
      isUserLoad: state.user.isUserLoad,
    };
  };

  return connect(
    mapStateToProps,
    null
  )((props: any) => {
    if (typeof window !== 'undefined') {
      const { userPermissions, isUserLoad, ...restProps } = props;

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

      if (isSuperAdmin(accessToken)) {
        return <WrappedComponent {...restProps} />;
      }

      if (!isUserLoad) {
        return null;
      }

      if (
        userPermissions[module] != undefined &&
        userPermissions[module].includes(permission)
      ) {
        return <WrappedComponent {...restProps} />;
      } else {
        router.replace('/privilege');
        return null;
      }
    }
    return null;
  });
};

export default withAuthAndPermission;
