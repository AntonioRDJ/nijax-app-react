import { Service, SocialNetworkEnum } from "../../utils/constants";

export interface User {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  birthDate: Date | string;
  cpfCpnj: number;
  isCompany: boolean;
  provider?: Provider;
};

export interface Provider {
  id: string;
  address: string;
  fantasyName?: string;
  providerService: {
    id: string;
    service: {
      id: number;
      name: Service;
    };
  }[];
  experiences: Experience[];
  formations: Formation[];
  socialNetworks: SocialNetwork[];
};

export interface CreateUserResponse {
  data: {
    accessToken: string,
    user: User,
  }
};

export interface CreateUserRequest {
  isCompany: boolean;
  name: string;
  email: string;
  cellphone: string;
  birthDate: Date | string;
  cpfCnpj: number;
  password: string;
};

export interface CreateProviderRequest extends CreateUserRequest {
  fantasyName?: string;
  address: string;
  service: Service;
  experiences?: Experience[];
  formations?: Formation[];
  socialNetworks?: SocialNetwork[];
}

export interface Experience {
  id: string;
  title: string;
  description: string;
};

export interface Formation {
  id: string;
  course: string;
  startDate: Date | string;
  endDate?: Date | string;
  institution: string;
};

export interface SocialNetwork {
  id: string;
  type?: SocialNetworkEnum;
  url: string;
};
