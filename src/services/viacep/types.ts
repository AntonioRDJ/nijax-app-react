

export interface GetAddressResponse {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  erro?: boolean,
};

export interface Address {
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
};
