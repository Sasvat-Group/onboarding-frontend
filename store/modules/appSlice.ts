import { createSlice } from '@reduxjs/toolkit';

interface ISideBar {
  isCollapsed: boolean;
  collapsedWidth: number;
  fullWidth: number;
}
export interface IAppState {
  sideBar: ISideBar;
}

const initialState: IAppState = {
  sideBar: {
    isCollapsed: false,
    collapsedWidth: 60,
    fullWidth: 256,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSideBar: (state: IAppState) => {
      state.sideBar.isCollapsed = !state.sideBar.isCollapsed;
    },
  },
});

export const { toggleSideBar } = appSlice.actions;

export const currentWidth = (state: any) =>
  state.app.sideBar.isCollapsed
    ? state.app.sideBar.collapsedWidth
    : state.app.sideBar.fullWidth;

export default appSlice.reducer;
