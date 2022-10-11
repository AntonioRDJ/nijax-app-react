import { combineReducers } from "@reduxjs/toolkit";
import signupReducer from "./Signup/slice";

const rootReducer = combineReducers({
  signup: signupReducer,
});

export default rootReducer;