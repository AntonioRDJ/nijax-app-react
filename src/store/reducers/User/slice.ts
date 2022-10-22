import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../services/user/types";
import { UserState } from "./types";

export const initialState: UserState = {
  loggedIn: false,
  accessToken: undefined,
  user: undefined,
  nameToDisplay: undefined,
  isProvider: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: { payload: {accessToken: string, user: User}, type: string}) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.nameToDisplay = action.payload.user.provider?.fantasyName || action.payload.user.name;
      state.isProvider = Boolean(action.payload.user.provider);
      state.loggedIn = true;
    },
    updateLoggedIn: (state, action: {payload: boolean, type: string}) => {
      state.loggedIn = action.payload;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {},
});

export const {
  saveUser,
  updateLoggedIn,
  logout,
} = userSlice.actions;
export default userSlice.reducer;