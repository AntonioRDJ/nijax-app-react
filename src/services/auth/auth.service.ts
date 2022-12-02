import { apiSlice } from "../api";
import { LoginResponse, LoginRequest } from "./types";

export const authEndpoints = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'v1/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authEndpoints;
