import { api } from "../api";


export const authenticate = async (login: string, password: string): Promise<boolean> => {
  try {
    await api.post(`user/auth`, {
      data: {
        login,
        password
      }
    });
    return true;
  } catch (error) {
    return false;
  }
}