import * as actions from "./user.actions";
import { userReducer } from "./user.reducer";

/**
 *  User profile interface
 */

export interface IUserProfile {
  photo?: string;
  name: string;
  location?: string;
  gender?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

/**
 *  User interface
 */
export interface IUser {
  _id: string;
  email: string;
  isActive: boolean;
  emailIsVerified: boolean;
  date: Date;
  role: string;
  profile: IUserProfile;
  __v: number;
}

/**
 *  User state interface
 */
export interface IUserState {
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  data: IUser | null;
}

/**
 *  User payload interface
 */
export interface IUserPayload {
  token: string;
  isAdmin?: boolean;
  adminSecret?: boolean;
}

/**
 *  User actions
 */
export const userActions = actions;

/**
 *  User reducer (state)
 */
export const user = userReducer;
