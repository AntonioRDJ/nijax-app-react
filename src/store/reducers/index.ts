import { combineReducers } from "@reduxjs/toolkit";
import signupReducer from "./Signup/slice";
import userReducer from "./User/slice";

const rootReducer = combineReducers({
  signup: signupReducer,
  user: userReducer
});

export default rootReducer;