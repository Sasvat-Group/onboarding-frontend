import { decodeToken, isSuperAdmin } from "../../../util/tokenutil";
import { AppDispatch } from "../../store/store";
import { SET_USER, START_SET_USER } from "./appActionConstatnt";

export const setUserAction = (token: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startSetUserAction())
    const user = decodeToken(token);
    dispatch(setUser(user, token));
  };
};

export const setUser = (user: any, token: string) => ({
  type: SET_USER,
  payload: { user, token },
})

export const startSetUserAction = () => ({
  type: START_SET_USER,
})