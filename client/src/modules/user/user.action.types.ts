import config from "../../constants/config";

/**
 *  User action types
 */

export const USER_SIGNUP = `${config.namespace}/USER_SIGNUP`;
export const USER_SIGNUP_SUCCESS = `${config.namespace}/USER_SIGNUP_SUCCESS`;
export const USER_SIGNUP_FAIL = `${config.namespace}/USER_SIGNUP_FAIL`;

export const USER_LOGIN = `${config.namespace}/USER_LOGIN`;
export const USER_LOGIN_SUCCESS = `${config.namespace}/USER_LOGIN_SUCCESS`;
export const USER_LOGIN_FAIL = `${config.namespace}/USER_LOGIN_FAIL`;

export const USER_AUTH = `${config.namespace}/USER_AUTH`;
export const USER_AUTH_SUCCESS = `${config.namespace}/USER_AUTH_SUCCESS`;
export const USER_AUTH_FAIL = `${config.namespace}/USER_AUTH_FAIL`;

export const USER_LOGOUT = `${config.namespace}/USER_LOGOUT`;

export const USER_VERIFY = `${config.namespace}/USER_VERIFY`;
export const USER_VERIFY_SUCCESS = `${config.namespace}/USER_VERIFY_SUCCESS`;
export const USER_VERIFY_FAIL = `${config.namespace}/USER_VERIFY_FAIL`;

export const USER_RESEND_VERIFY = `${config.namespace}/USER_RESEND_VERIFY`;
export const USER_RESEND_VERIFY_SUCCESS = `${config.namespace}/USER_RESEND_VERIFY_SUCCESS`;
export const USER_RESEND_VERIFY_FAIL = `${config.namespace}/USER_RESEND_VERIFY_FAIL`;
