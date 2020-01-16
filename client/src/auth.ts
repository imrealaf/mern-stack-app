import config from "./constants/config";
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
  return localStorage.getItem(config.auth.tokenStorageName);
};

/**
 *  Set auth token
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(config.auth.tokenStorageName, token);
};

/**
 *  Remove auth token
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(config.auth.tokenStorageName);
};

/**
 *  Check auth token
 */
export const checkAuthToken = (): void => {
  if (hasAuthToken()) {
    setAuthTokenHeader(getAuthToken());
  }
};
