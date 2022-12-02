import { createSlice } from "@reduxjs/toolkit";
import { SignupState } from "./types";


export const initialState: SignupState = {
  isCompany: false,
  name: "",
  email: "",
  cellphone: "",
  birthDate: "",
  cpfCnpj: undefined,
  password: "",
  confirmPassword: "",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateFields: (state, action: { payload: SignupState, type: string}) => {
      state.isCompany = action.payload.isCompany;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.cellphone = action.payload.cellphone;
      state.birthDate = action.payload.birthDate;
      state.cpfCnpj = action.payload.cpfCnpj;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
    resetFields: (state) => {
      state.isCompany = false;
      state.name = "";
      state.email = "";
      state.cellphone = "";
      state.birthDate = "";
      state.cpfCnpj = undefined;
      state.password = "";
      state.confirmPassword = "";
    },
  },
  extraReducers: (builder) => {},
});

export const {
  updateFields,
  resetFields,
} = signupSlice.actions;
export default signupSlice.reducer;