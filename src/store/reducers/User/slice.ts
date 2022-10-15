import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../services/user/types";
import { UserState } from "./types";

export const initialState: UserState = {
  loggedIn: false,
  accessToken: undefined,
  user: undefined
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: { payload: {accessToken: string, user: User}, type: string}) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.loggedIn = true;
    },
    updateLoggedIn: (state, action: {payload: boolean, type: string}) => {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  saveUser,
  updateLoggedIn,
} = userSlice.actions;
export default userSlice.reducer;