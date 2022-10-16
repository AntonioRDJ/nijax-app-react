import { apiSlice } from "../api";
import { CreateProviderRequest, CreateUserRequest, CreateUserResponse } from "./types";

export const userEndpoints = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: (user: CreateUserRequest) => ({
        url: 'v1/user',
        method: 'POST',
        body: user,
      }),
    }),
    createProvider: builder.mutation<CreateUserResponse, CreateProviderRequest>({
      query: (provider: CreateProviderRequest) => ({
        url: 'v1/user',
        method: 'POST',
        body: provider,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useCreateProviderMutation } = userEndpoints;
