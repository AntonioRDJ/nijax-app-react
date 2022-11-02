import { User } from "../../../services/user/types";
import { Service } from "../../../utils/constants";

export interface UserState {
  loggedIn: boolean;
  accessToken?: string;
  user?: User;
  nameToDisplay?: string;
  isProvider: boolean;
  service?: Service;
};
