import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config } from "../../config";
import { GetAddressResponse } from "./types";

export const viacepApi = createApi({
  reducerPath: "viacepApi",
  baseQuery: fetchBaseQuery({ baseUrl: Config.VIACEP_API_URL, mode: "cors" }),
  endpoints: builder => ({
    getAddress: builder.query<GetAddressResponse, string>({
      query: (cep) => ({
        url: `${cep}/json`,
      }),
    })
  }),
});

export const {
  useLazyGetAddressQuery,
} = viacepApi;
