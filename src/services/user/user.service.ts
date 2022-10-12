import { api } from "../api";
import { CreateProvider, CreateUser, User } from "./types";

export const createUser = async (user: CreateUser): Promise<boolean> => {
  try {
    await api.post(`user`, {
      data: {
        user
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const createProvider = async (user: CreateProvider): Promise<boolean> => {
  try {
    await api.post(`user`, {
      data: {
        user
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};
