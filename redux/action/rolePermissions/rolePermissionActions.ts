import { get } from '../../../util/servercall';
import { AppDispatch } from '../../store/store';
import {
  INSERT_PERMISSION,
  INSERT_PERMISSION_START,
} from './rolePermissionConstant';

export const addUserPermission = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(addUserPermissionStartAction());
    const permissionsResponse = await get('/api/v1/user/getpermission');
    console.log("in role permission")
    console.log(permissionsResponse.data)
    dispatch(addUserPermissionAction(permissionsResponse.data));
  };
};

export const addUserPermissionStartAction = () => ({
  type: INSERT_PERMISSION_START,
});

export const addUserPermissionAction = (data: any) => ({
  type: INSERT_PERMISSION,
  payload: data,
});
