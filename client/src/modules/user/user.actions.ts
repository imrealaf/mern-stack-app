import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import * as routes from "../../constants/routes";
import * as auth from "../../utils/auth";
import { sendRequest } from "../../utils/http";
import types from "../actions";
import { IUser, IUserPayload } from "./";

//////////////////////////  A U T H   /////////////////////////////////////////////

/**
 *  Auth
 *  @type action creator
 */
export const doAuth = (): AnyAction => {
  return {
    type: types.USER_AUTH
  };
};

/**
 *  Auth success
 *  @type action creator
 */
export const authSuccess = (payload: IUser | null): AnyAction => {
  return {
    type: types.USER_AUTH_SUCCESS,
    payload
  };
};

/**
 *  Auth fail
 *  @type action creator
 */
export const authFail = (): AnyAction => {
  return {
    type: types.USER_AUTH_FAIL
  };
};

/**
 *  Get current user
 *  @type async action
 */
export const getCurrentUser = (): any => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  // Check token
  auth.checkAuthToken();

  // Do auth action
  dispatch(doAuth());

  // Login success ..
  try {
    const response = await sendRequest("get", routes.AUTH);
    dispatch(authSuccess(response.data));

    // Login fail ..
  } catch (error) {
    dispatch(authFail());
  }
};

//////////////////////////  V E R I F Y   /////////////////////////////////////////////

/**
 *  Verify
 *  @type action creator
 */
export const doVerify = (): AnyAction => {
  return {
    type: types.USER_VERIFY
  };
};

/**
 *  Verify: success
 *  @type action creator
 */
export const verifySuccess = (): AnyAction => {
  return {
    type: types.USER_VERIFY_SUCCESS
  };
};

/**
 *  Verify: fail
 *  @type action creator
 */
export const verifyFail = (): AnyAction => {
  return {
    type: types.USER_VERIFY_FAIL
  };
};

//////////////////////////  R E - S E N D  V E R I F Y   /////////////////////////////////////////////

/**
 *  Resend verification
 *  @type action creator
 */
export const resendVerify = (): AnyAction => {
  return {
    type: types.USER_RESEND_VERIFY
  };
};

/**
 *  Resend Verify: success
 *  @type action creator
 */
export const resendVerifySuccess = (): AnyAction => {
  return {
    type: types.USER_RESEND_VERIFY_SUCCESS
  };
};

/**
 *  Rsend Verify: fail
 *  @type action creator
 */
export const resendVerifyFail = (): AnyAction => {
  return {
    type: types.USER_RESEND_VERIFY_FAIL
  };
};

//////////////////////////  S I G N  U P   /////////////////////////////////////////////

/**
 *  Sign up
 *  @type action creator
 */
export const signUp = (): AnyAction => {
  return {
    type: types.USER_SIGNUP
  };
};

/**
 *  Sign up success
 *  @type action creator
 */
export const signUpSuccess = (payload: any): AnyAction => {
  return {
    type: types.USER_SIGNUP_SUCCESS,
    payload
  };
};

/**
 *  Sign up fail
 *  @type action creator
 */
export const signUpFail = (): AnyAction => {
  return {
    type: types.USER_SIGNUP_FAIL
  };
};

//////////////////////////  L O G I N  /////////////////////////////////////////////

/**
 *  Login success
 *  @type action creator
 */
export const loginSuccess = (payload: IUserPayload): AnyAction => {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload
  };
};

/**
 *  Login fail
 *  @type action creator
 */
export const loginFail = (): AnyAction => {
  return {
    type: types.USER_LOGIN_FAIL
  };
};

/**
 *  Login
 *  @type action creator
 */
export const login = (): AnyAction => {
  return {
    type: types.USER_LOGIN
  };
};

/**
 *  Do login
 *  @type async action
 */
export const doLogin = (token: IUserPayload): any => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(loginSuccess(token));
  dispatch(getCurrentUser());
};

//////////////////////////  L O G O U T   /////////////////////////////////////////////

/**
 *  Logout
 *  @type action creator
 */
export const logout = (): AnyAction => {
  return {
    type: types.USER_LOGOUT
  };
};

/**
 *  Do logout
 *  @type async action
 */
export const doLogout = (): any => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(logout());
};
