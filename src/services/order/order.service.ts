import { Service, Status } from "../../utils/constants";
import { apiSlice } from "../api";
import { CreateOrderRequest, CreateOrderResponse, GetOrderResponse, ListOrdersResponse, Order } from "./types";

export const mockOrders: Order[] = [
  {
    id: "1",
    title: "title1",
    description: "description1",
    address: "Rua seila onde sei la oq",
    service: Service.AUTOMOBILES,
    radiusDistance: 50,
    status: Status.OPENED,
  },
  {
    id: "2",
    title: "title2",
    description: "description2",
    address: "Rua seila onde sei la oq",
    service: Service.LESSON,
    radiusDistance: 50,
    status: Status.OPENED,
  },
  {
    id: "3",
    title: "title3",
    description: "description3",
    address: "Rua seila",
    service: Service.RENOVATIONS_REPAIRS,
    radiusDistance: 50,
    status: Status.CLOSED,
  },
  {
    id: "4",
    title: "title4",
    description: "description4",
    address: "Rua seila onde sei la oq ham?",
    service: Service.TECHNICAL_ASSISTANCE,
    radiusDistance: 50,
    status: Status.NEGOTIATION,
  },
  {
    id: "5",
    title: "title5",
    description: "description5",
    address: "Rua seila onde sei la",
    service: Service.AUTOMOBILES,
    radiusDistance: 100,
    status: Status.NEGOTIATION,
  }
];

export const orderEndpoints = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (order) => ({
        url: 'v1/order',
        method: 'POST',
        body: order,
      }),
    }),
    listOrders: builder.query<Order[], number>({
      query: (page) => {
        const offset = page > 1 ? page * 15 : 0;
        return {
          url: 'v1/orders',
          params: {
            limit: 15,
            offset
          }
        }
      },
      transformResponse: (response: ListOrdersResponse) => {
        return response.data.orders;
      },
    }),
    getOrder: builder.query<Order, string>({
      query: (id) => ({
        url: `v1/orders/${id}`,
      }),
      transformResponse: (response: GetOrderResponse) => {
        return response.data.order;
      },
    }),
  }),
});

export const { useCreateOrderMutation, useListOrdersQuery, useGetOrderQuery } = orderEndpoints;
