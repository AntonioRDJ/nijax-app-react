import { apiSlice } from "../api";
import { CreateProviderRequest, CreateUserRequest, CreateUserResponse, GetAddressResponse, User } from "./types";

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
    verifyByEmail: builder.query<{message: string}, string>({
      query: (email) => ({
        url: `v1/user/by-email/${email}`,
      }),
    }),
    verifyByCellphone: builder.query<{message: string}, string>({
      query: (cellphone) => ({
        url: `v1/user/by-cellphone/${cellphone}`,
      }),
    }),
    verifyByCpfCnpj: builder.query<{message: string}, number>({
      query: (cpfCnpj) => ({
        url: `v1/user/by-cpf-cnpj/${cpfCnpj}`,
      }),
    }),
    getByUserId: builder.query<{data: {user: User}}, string>({
      query: (userId) => ({
        url: `v1/user/${userId}`,
      }),
    }),
    updateUser: builder.mutation<{data: {user: User}}, User>({
      query: (user) => ({
        url: 'v1/user',
        method: 'PATCH',
        body: user,
      }),
    }),
    getAddressByLocation: builder.query<GetAddressResponse, {lat: number, lng: number}>({
      query: ({lat, lng}) => ({
        url: 'v1/location/address',
        params: {
          lat,
          lng,
        }
      }),
    }),
  }),
});

export const { 
  useCreateUserMutation,
  useCreateProviderMutation,
  useLazyVerifyByEmailQuery,
  useLazyVerifyByCellphoneQuery,
  useLazyVerifyByCpfCnpjQuery,
  useLazyGetByUserIdQuery,
  useUpdateUserMutation,
  useLazyGetAddressByLocationQuery,
} = userEndpoints;
