import { Service } from "../../utils/constants";

export interface Order {
  id: string;
  title: string;
  description: string;
  address: string;
  service: Service;
  radiusDistance: number;
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
