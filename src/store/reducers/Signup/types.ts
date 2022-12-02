
export interface SignupState {
  isCompany: boolean;
  name: string;
  email: string;
  cellphone: string;
  birthDate: Date | string;
  cpfCnpj?: number;
  password: string;
  confirmPassword: string;
};
