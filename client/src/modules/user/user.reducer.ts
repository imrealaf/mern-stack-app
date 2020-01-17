import { AnyAction } from "redux";

import { getAuthToken, removeAuthToken, setAuthToken } from "../../utils/auth";
import types from "../actions";
import { IUserState } from "./";

/**
 *  Initial state
 */
export const initialState: IUserState = {
  token: getAuthToken(),
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
  data: null
};

export const userReducer = (
  state: IUserState = initialState,
  action: AnyAction
) => {
  /**
   *  Destructure data from payload
   */
  const { type, payload } = action;

  switch (type) {
    /**
     *  Auth success
     */
    case types.USER_AUTH_SUCCESS:
      return {
        ...state,
        data: payload,
        isAuthenticated: true,
        isAdmin: payload.role === "admin" && payload.adminSecret ? true : false,
        loading: false
      };

    /**
     *  Auth fail
     */
    case types.USER_AUTH_FAIL:
      // Remove token from local storage
      removeAuthToken();
      return {
        ...state,
        data: null,
        isAuthenticated: false,
        isAdmin: false,
        loading: false
      };

    /**
     *  Login/Sign up success
     */
    case types.USER_SIGNUP_SUCCESS:
      const newState = {
        ...state,
        isAuthenticated: !payload.verify ? true : false,
        loading: false
      };
      if (!payload.verify) {
        setAuthToken(payload.token);
        newState.data = payload.user;
      }
      return newState;

    /**
     *  Set loading
     */
    case types.USER_AUTH:
    case types.USER_LOGIN:
    case types.USER_SIGNUP:
    case types.USER_VERIFY:
    case types.USER_RESEND_VERIFY:
      return { ...state, loading: true };

    /**
     *  Set not loading
     */
    case types.USER_VERIFY_SUCCESS:
    case types.USER_RESEND_VERIFY_SUCCESS:
      return { ...state, loading: false };

    /**
     *  Login/Sign up success
     */
    case types.USER_LOGIN_SUCCESS:
      // Set token to local storage
      setAuthToken(payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };

    /**
     *  Login/Sign up fail or Logout
     */
    case types.USER_SIGNUP_FAIL:
    case types.USER_LOGIN_FAIL:
    case types.USER_LOGOUT:
      // Remove token from local storage
      removeAuthToken();
      return {
        ...state,
        data: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    /**
     *  Default
     */
    default:
      return state;
  }
};
