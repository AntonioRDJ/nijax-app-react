import { createSlice } from "@reduxjs/toolkit";
import { SignupState } from "./types";


export const initialState: SignupState = {
  isProfessional: false,
  name: "",
  email: "",
  cellphone: "",
  cpfOrCnpj: undefined,
  password: "",
  confirmPassword: "",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateIsProfessional: (state, action: {payload: boolean; type: string}) => {
      state.isProfessional = action.payload;
    },
    updateName: (state, action: {payload: string; type: string}) => {
      state.name = action.payload;
    },
    updateEmail: (state, action: {payload: string; type: string}) => {
      state.email = action.payload;
    },
    updateCellphone: (state, action: {payload: string; type: string}) => {
      state.cellphone = action.payload;
    },
    updateCpfOrCnpj : (state, action: {payload: number; type: string}) => {
      state.cpfOrCnpj = action.payload;
    },
    updatePassword : (state, action: {payload: string; type: string}) => {
      state.password = action.payload;
    },
    updateConfirmPassword : (state, action: {payload: string; type: string}) => {
      state.confirmPassword = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  updateCellphone,
  updateConfirmPassword,
  updateCpfOrCnpj,
  updateEmail,
  updateIsProfessional,
  updateName,
  updatePassword,
} = signupSlice.actions;
export default signupSlice.reducer;