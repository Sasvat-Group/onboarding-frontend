import { SET_USER, START_SET_USER } from "../action/appAction/appActionConstatnt";

  export interface IAppInitType {
    isLoading: boolean;
    user: any;
    token : string;
  }
  
  const initialValues: IAppInitType = {
    isLoading: true,
    user: {},
    token: ""
  };
  
  function appReducer(state = initialValues, action: any) {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          token: action.payload.token
        };
      case START_SET_USER:
        return {
          ...state,
          isLoading: true
        }
      default:
        return state;
    }
  }
  export default appReducer;
  