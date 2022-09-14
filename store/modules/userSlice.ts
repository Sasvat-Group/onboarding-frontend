import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { decodeToken } from '../../util/tokenutil';
import { get } from '../../util/servercall';

interface ICurrentUser {
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface IUserState {
  currentUser: ICurrentUser;
  userPermissions: any;
  isUserLoad: boolean
}

const initialState: IUserState = {
  currentUser: {
    email: '',
    isAdmin: false,
    token: '',
  },
  userPermissions: null,
  isUserLoad: false
};

export const loadUserPermissions = createAsyncThunk(
  'user/loadUserPermissions',
  async () => {
    return await getUserPermission()
  }
);

export const getUserPermission = async () => {
  const response = await get('/api/v1/user/getpermission');
  console.log("in user slice")
  console.log(response.data)
  return response.data;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state: IUserState, action: PayloadAction<string>) => {
      const { email, is_super_admin } = decodeToken(action.payload);
      state.currentUser.email = email;
      state.currentUser.isAdmin = is_super_admin;
      state.currentUser.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserPermissions.fulfilled, (state, action) => {
      state.userPermissions = action.payload;
      state.isUserLoad = true
    });
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
