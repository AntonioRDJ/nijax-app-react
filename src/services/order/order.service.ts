import { apiSlice } from "../api";
import { CreateOrderRequest, CreateOrderResponse } from "./types";

export const orderEndpoints = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (order) => ({
        url: 'v1/order',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderEndpoints;
