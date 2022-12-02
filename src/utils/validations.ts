import { regexCellphone, regexCep, regexCNPJorCPJ, regexEmail, regexPassword } from "./regex";

export const validateEmail = (email?: string) => {
  return Boolean(email?.match(regexEmail));
}

export const validatePassword = (password?: string) => {
  return Boolean(password?.match(regexPassword));
}

export const validateCpfCnpj = (cpfCnpj?: string | number) => {
  return Boolean(cpfCnpj?.toString().match(regexCNPJorCPJ));
}

export const validateCellphone = (cellphone?: string) => {
  return Boolean(cellphone?.match(regexCellphone));
}

export const validateBirthDate = (birthDate?: string | Date) => {
  if(!birthDate) {
    return false;
  }

  const currentDate = new Date();
  const date = new Date(birthDate);
  let age = currentDate.getFullYear() - date.getFullYear();
  const month = currentDate.getMonth() - date.getMonth();

  if(month < 0 || (month === 0 && currentDate.getDate() < date.getDate())) {
    age--;
  }

  return age >= 18;
}

export const validateCep = (cep?: number | string) => {
  return Boolean(cep?.toString().match(regexCep));
}
