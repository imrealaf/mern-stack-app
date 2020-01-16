import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import * as auth from "../../auth";
import * as routes from "../../constants/routes";
import { sendRequest } from "../../http";
import { AuthPayload, AuthUserPayload } from "../../types/Auth";
import * as types from "../actionTypes";

//////////////////////////  A U T H   /////////////////////////////////////////////

/**
 *  Auth
 *  @type action creator
 */
export const doAuth = (): AnyAction => {
  return {
    type: types.AUTH
  };
};

/**
 *  Auth success
 *  @type action creator
 */
export const authSuccess = (payload: AuthUserPayload): AnyAction => {
  return {
    type: types.AUTH_SUCCESS,
    payload
  };
};

/**
 *  Auth fail
 *  @type action creator
 */
export const authFail = (): AnyAction => {
  return {
    type: types.AUTH_FAIL
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
    type: types.VERIFY
  };
};

/**
 *  Verify: success
 *  @type action creator
 */
export const verifySuccess = (): AnyAction => {
  return {
    type: types.VERIFY_SUCCESS
  };
};

/**
 *  Verify: fail
 *  @type action creator
 */
export const verifyFail = (): AnyAction => {
  return {
    type: types.VERIFY_FAIL
  };
};

//////////////////////////  R E - S E N D  V E R I F Y   /////////////////////////////////////////////

/**
 *  Resend verification
 *  @type action creator
 */
export const resendVerify = (): AnyAction => {
  return {
    type: types.RESEND_VERIFY
  };
};

/**
 *  Resend Verify: success
 *  @type action creator
 */
export const resendVerifySuccess = (): AnyAction => {
  return {
    type: types.RESEND_VERIFY_SUCCESS
  };
};

/**
 *  Rsend Verify: fail
 *  @type action creator
 */
export const resendVerifyFail = (): AnyAction => {
  return {
    type: types.RESEND_VERIFY_FAIL
  };
};

//////////////////////////  S I G N  U P   /////////////////////////////////////////////

/**
 *  Sign up
 *  @type action creator
 */
export const signUp = (): AnyAction => {
  return {
    type: types.SIGNUP
  };
};

/**
 *  Sign up success
 *  @type action creator
 */
export const signUpSuccess = (payload: any): AnyAction => {
  return {
    type: types.SIGNUP_SUCCESS,
    payload
  };
};

/**
 *  Sign up fail
 *  @type action creator
 */
export const signUpFail = (): AnyAction => {
  return {
    type: types.SIGNUP_FAIL
  };
};

//////////////////////////  L O G I N  /////////////////////////////////////////////

/**
 *  Login success
 *  @type action creator
 */
export const loginSuccess = (payload: AuthPayload): AnyAction => {
  return {
    type: types.LOGIN_SUCCESS,
    payload
  };
};

/**
 *  Login fail
 *  @type action creator
 */
export const loginFail = (): AnyAction => {
  return {
    type: types.LOGIN_FAIL
  };
};

/**
 *  Login
 *  @type action creator
 */
export const login = (): AnyAction => {
  return {
    type: types.LOGIN
  };
};

/**
 *  Do login
 *  @type async action
 */
export const doLogin = (token: AuthPayload): any => async (
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
    type: types.LOGOUT
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
