import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Modules } from '../../type/module';
import { isSuperAdmin, isTokenExpired } from '../../util/tokenutil';
import type { RootState } from '../../redux/store/store';

interface Props {
  children: React.ReactNode;
  module: Modules;
}

const ShowModuele = ({ children, module }: Props): React.ReactNode | null |any  => {
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  
  const userPermission = useAppSelector(
    (state) => {
     console.log(state.rolePermissionReducer.userPermission)
     return state.rolePermissionReducer.userPermission
    }
  );

  if (!accessToken) {
    return null;
  }

  if (isTokenExpired(accessToken)) {
    localStorage.removeItem('token');
    return null;
  }

  if (isSuperAdmin(accessToken)) {
    return children;
  }

  if (userPermission[module] != undefined) {
    return children;
  }
  return null;
};

export default ShowModuele;
