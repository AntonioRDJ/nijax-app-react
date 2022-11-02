import { Service, Status } from "../../utils/constants";
import { User } from "../user/types";

export interface Order {
  id: string;
  title: string;
  description: string;
  address: string;
  service: {
    id: number;
    name: Service;
  };
  radiusDistance?: number;
  status: Status;
  owner?: User;
  candidates?: User[];
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
  // radiusDistance: number;
};

export interface ListOrdersResponse {
  data: {
    orders: Order[];
  }
};

export interface ListOrdersRequest  {
  page: number;
  limit: number;
  service?: Service;
  forProvider?: boolean;
}

export interface GetOrderResponse {
  data: {
    order: Order;
  }
};
