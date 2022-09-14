import { useSelector } from 'react-redux';
import { Modules } from '../../../type/module';
import { Permissions } from '../../../type/permission';
import { isSuperAdmin, isTokenExpired } from '../../../util/tokenutil';
import { RootState } from '../../../store';

interface Props {
  children: React.ReactNode;
  module: Modules;
  permission: Permissions;
}

const ModulePermission = ({
  children,
  module,
  permission,
}: Props): React.ReactNode | null | any => {
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const userPermissions = useSelector(
    (state: RootState) => state.user.userPermissions
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
  console.log("in module permision")
  console.log(userPermissions)
  if (
    userPermissions[module] != undefined &&
    userPermissions[module].includes(permission)
  ) {
    return children;
  }
  return null;
};

export default ModulePermission;
