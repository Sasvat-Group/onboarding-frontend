import {
  INSERT_PERMISSION,
  INSERT_PERMISSION_START,
} from '../action/rolePermissions/rolePermissionConstant';

export interface IRolePermissionState {
  userPermission: any;
  isLoading: boolean;
}

const initialValues: IRolePermissionState = {
  userPermission: {},
  isLoading: true,
};

function rolePermissionReducer(state = initialValues, action: any) {
  console.log(action)
  switch (action.type) {
    case INSERT_PERMISSION:
      return {
        ...state,
        isLoading: false,
        userPermission: action.payload,
    };
    
    case INSERT_PERMISSION_START:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
export default rolePermissionReducer;
