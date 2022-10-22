import { Service, Status } from "../../utils/constants";

export interface Order {
  id: string;
  title: string;
  description: string;
  address: string;
  service: Service;
  radiusDistance: number;
  status: Status;
};

export interface CreateOrderResponse {
  data: {
    order: Order;
  }
};

export interface CreateOrderRequest {
  title: string;
  description: string;
  address: string;
  service: Service;
  radiusDistance: number;
};

export interface ListOrdersResponse {
  data: {
    orders: Order[];
  }
};

export interface ListOrdersRequest {
  limit: number;
  offset: number;
};
