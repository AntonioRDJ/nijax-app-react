import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../services/user/types";
import { UserState } from "./types";

export const initialState: UserState = {
  loggedIn: false,
  accessToken: undefined,
  user: undefined,
  nameToDisplay: undefined,
  isProvider: false,
  service: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: { payload: {accessToken: string, user: User}, type: string}) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.nameToDisplay = action.payload.user.provider?.fantasyName || action.payload.user.name;
      if(action.payload.user?.provider) {
        state.isProvider = true;
        state.service = action.payload.user.provider.service;
      }
      state.loggedIn = true;
    },
    updateLoggedIn: (state, action: {payload: boolean, type: string}) => {
      state.loggedIn = action.payload;
    },
    updateUser: (state, action: {payload: User, type: string}) => {
      state.user = action.payload;
      state.nameToDisplay = action.payload.provider?.fantasyName || action.payload.name;
      if(action.payload.provider) {
        state.isProvider = true;
        state.service = action.payload.provider.service;
      }
    },
    logout: () => { },
  },
  extraReducers: (builder) => {},
});

export const {
  saveUser,
  updateLoggedIn,
  updateUser,
  logout,
} = userSlice.actions;
export default userSlice.reducer;