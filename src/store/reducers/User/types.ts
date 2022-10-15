import { User } from "../../../services/user/types";

export interface UserState {
  loggedIn: boolean;
  accessToken?: string;
  user?: User;
};
