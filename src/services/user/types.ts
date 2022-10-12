import { Service, SocialNetworkEnum } from "../../utils/constants";

export interface User {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  cpf_cpnj: number;
  is_company: boolean;
};

export interface CreateUser {
  isCompany: boolean;
  name: string;
  email: string;
  cellphone: string;
  cpfCnpj: number;
  password: string;
  confirmPassword: string;
};

export interface CreateProvider extends CreateUser {
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
