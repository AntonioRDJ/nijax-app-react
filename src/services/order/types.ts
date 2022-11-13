import { Service, Status } from "../../utils/constants";
import { Provider, User } from "../user/types";

export interface Order {
  id: string;
  title: string;
  description: string;
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
  number: string;
  service: Service;
  radiusDistance?: number;
  status: Status;
  user?: User;
  candidacy?: Candidacy[];
};

export interface Candidacy {
  provider: CandidacyProvider;
};

export interface CandidacyProvider extends Provider {
  user: User;
}

export interface CreateOrderResponse {
  data: {
    order: Order;
  }
};

export interface CreateOrderRequest {
  title: string;
  description: string;
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
  number: string;
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
  onlyCandidate?: boolean;
}

export interface GetOrderResponse {
  data: {
    order: Order;
  }
};
