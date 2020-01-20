import config from "../constants/config";
import * as routes from "../constants/routes";
import { deleteHeader, setHeader } from "./http";

/**
 *  Set auth token header
 */
export const setAuthTokenHeader = (token: string | null): void => {
  if (token) {
    setHeader("Authorization", "bearer " + token);
  } else {
    deleteHeader("Authorization");
  }
};

/**
 *  Has auth token
 */
export const hasAuthToken = (): boolean => {
  return getAuthToken() ? true : false;
};

/**
 *  Get auth token
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(config.TOKEN_STORAGE_NAME);
};

/**
 *  Set auth token
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(config.TOKEN_STORAGE_NAME, token);
};

/**
 *  Remove auth token
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(config.TOKEN_STORAGE_NAME);
};

/**
 *  Check auth token
 */
export const checkAuthToken = (): void => {
  if (hasAuthToken()) {
    setAuthTokenHeader(getAuthToken());
  }
};

/**
 *  Determine if auth page
 */
export const isAuthPage = (location: any) => {
  return (
    location.pathname === routes.LOGIN ||
    location.pathname === routes.SIGN_UP ||
    location.pathname === routes.RESEND_VERIFY ||
    (location.pathname !== "/" &&
      routes.VERIFY.indexOf("/" + location.pathname.split("/")[1]) > -1)
  );
};
