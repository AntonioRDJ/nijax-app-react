import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../../services/api";
import { viacepApi } from "../../services/viacep/viacep.service";
import signupReducer from "./Signup/slice";
import userReducer from "./User/slice";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  signup: signupReducer,
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [viacepApi.reducerPath]: viacepApi.reducer,
});

const rootReducer: typeof appReducer = (state, action) => {
  if(action.type === "user/logout") {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;