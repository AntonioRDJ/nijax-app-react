import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../../services/api";
import signupReducer from "./Signup/slice";
import userReducer from "./User/slice";

const rootReducer = combineReducers({
  signup: signupReducer,
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;