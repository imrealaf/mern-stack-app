import config from "../../constants/config";

/**
 *  User action types
 */

export const USER_SIGNUP = `${config.NAMESPACE}/USER_SIGNUP`;
export const USER_SIGNUP_SUCCESS = `${config.NAMESPACE}/USER_SIGNUP_SUCCESS`;
export const USER_SIGNUP_FAIL = `${config.NAMESPACE}/USER_SIGNUP_FAIL`;

export const USER_LOGIN = `${config.NAMESPACE}/USER_LOGIN`;
export const USER_LOGIN_SUCCESS = `${config.NAMESPACE}/USER_LOGIN_SUCCESS`;
export const USER_LOGIN_FAIL = `${config.NAMESPACE}/USER_LOGIN_FAIL`;

export const USER_AUTH = `${config.NAMESPACE}/USER_AUTH`;
export const USER_AUTH_SUCCESS = `${config.NAMESPACE}/USER_AUTH_SUCCESS`;
export const USER_AUTH_FAIL = `${config.NAMESPACE}/USER_AUTH_FAIL`;

export const USER_LOGOUT = `${config.NAMESPACE}/USER_LOGOUT`;

export const USER_VERIFY = `${config.NAMESPACE}/USER_VERIFY`;
export const USER_VERIFY_SUCCESS = `${config.NAMESPACE}/USER_VERIFY_SUCCESS`;
export const USER_VERIFY_FAIL = `${config.NAMESPACE}/USER_VERIFY_FAIL`;

export const USER_RESEND_VERIFY = `${config.NAMESPACE}/USER_RESEND_VERIFY`;
export const USER_RESEND_VERIFY_SUCCESS = `${config.NAMESPACE}/USER_RESEND_VERIFY_SUCCESS`;
export const USER_RESEND_VERIFY_FAIL = `${config.NAMESPACE}/USER_RESEND_VERIFY_FAIL`;
