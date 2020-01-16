import { AnyAction } from "redux";

import { getAuthToken, removeAuthToken, setAuthToken } from "../../auth";
import { AuthUserState } from "../../types/Auth";
import * as types from "../actionTypes";

/**
 *  Initial state
 */
const initialState: AuthUserState = {
  token: getAuthToken(),
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
  data: null
};

export default (state: AuthUserState = initialState, action: AnyAction) => {
  /**
   *  Destructure data from payload
   */
  const { type, payload } = action;

  switch (type) {
    /**
     *  Auth success
     */
    case types.AUTH_SUCCESS:
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
    case types.AUTH_FAIL:
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
    case types.SIGNUP_SUCCESS:
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
    case types.AUTH:
    case types.LOGIN:
    case types.SIGNUP:
    case types.VERIFY:
    case types.RESEND_VERIFY:
      return { ...state, loading: true };

    /**
     *  Set not loading
     */
    case types.VERIFY_SUCCESS:
    case types.RESEND_VERIFY_SUCCESS:
      return { ...state, loading: false };

    /**
     *  Login/Sign up success
     */
    case types.LOGIN_SUCCESS:
      // Set token to local storage
      setAuthToken(payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };

    /**
     *  Login/Sign up fail or Logout
     */
    case types.SIGNUP_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGOUT:
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
