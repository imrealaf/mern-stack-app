import { IUser } from "./User";

export type SignUpState = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginState = {
  email: string;
  password: string;
  isAdmin?: boolean;
};

export type ResendVerifyState = {
  email: string;
};

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: any;
};

export type AuthUserState = {
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  data: IUser | null;
};

export type AuthPayload = {
  token: string;
  isAdmin?: boolean;
};

export type AuthUserPayload = IUser | null;
