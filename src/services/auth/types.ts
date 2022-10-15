import { User } from "../user/types"

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    accessToken: string,
    user: User,
  }
};
