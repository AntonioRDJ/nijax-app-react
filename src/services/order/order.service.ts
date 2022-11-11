import { apiSlice } from "../api";
import { CreateOrderRequest, CreateOrderResponse, GetOrderResponse, ListOrdersRequest, ListOrdersResponse, Order } from "./types";

export const orderEndpoints = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (order) => ({
        url: 'v1/order',
        method: 'POST',
        body: order,
      }),
    }),
    listOrders: builder.query<Order[], ListOrdersRequest>({
      query: (filter) => {
        const offset = filter.page > 1 ? (filter.page - 1) * filter.limit : 0;
        return {
          url: 'v1/order',
          params: {
            limit: filter.limit,
            offset,
            service: filter.service,
            forProvider: filter.forProvider,
            onlyCandidate: filter.onlyCandidate,
          }
        }
      },
      transformResponse: (response: ListOrdersResponse) => {
        return response.data.orders;
      },
    }),
    getOrder: builder.query<Order, string>({
      query: (id) => ({
        url: `v1/order/${id}`,
      }),
      transformResponse: (response: GetOrderResponse) => {
        return response.data.order;
      },
    }),

    applyInOrder: builder.mutation<any, string>({
      query: (orderId) => ({
        method: "PATCH",
        url: `v1/order/set-candidacy/${orderId}`,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useListOrdersQuery, useGetOrderQuery, useLazyListOrdersQuery, useApplyInOrderMutation } = orderEndpoints;
