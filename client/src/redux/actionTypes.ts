import config from "../constants/config";

/**
 *  Auth actions
 */
export const SIGNUP = `${config.namespace}/SIGNUP`;
export const SIGNUP_SUCCESS = `${config.namespace}/SIGNUP_SUCCESS`;
export const SIGNUP_FAIL = `${config.namespace}/SIGNUP_FAIL`;

export const LOGIN = `${config.namespace}/LOGIN`;
export const LOGIN_SUCCESS = `${config.namespace}/LOGIN_SUCCESS`;
export const LOGIN_FAIL = `${config.namespace}/LOGIN_FAIL`;

export const ADMIN_LOGIN = `${config.namespace}/ADMIN_LOGIN`;
export const ADMIN_LOGIN_SUCCESS = `${config.namespace}/ADMIN_LOGIN_SUCCESS`;
export const ADMIN_LOGIN_FAIL = `${config.namespace}/ADMIN_LOGIN_FAIL`;

export const AUTH = `${config.namespace}/AUTH`;
export const AUTH_SUCCESS = `${config.namespace}/AUTH_SUCCESS`;
export const AUTH_FAIL = `${config.namespace}/AUTH_FAIL`;

export const ADMIN_AUTH = `${config.namespace}/ADMIN_AUTH`;
export const ADMIN_AUTH_SUCCESS = `${config.namespace}/ADMIN_AUTH_SUCCESS`;
export const ADMIN_AUTH_FAIL = `${config.namespace}/ADMIN_AUTH_FAIL`;

export const LOGOUT = `${config.namespace}/LOGOUT`;
export const ADMIN_LOGOUT = `${config.namespace}/ADMIN_LOGOUT`;

export const VERIFY = `${config.namespace}/VERIFY`;
export const VERIFY_SUCCESS = `${config.namespace}/VERIFY_SUCCESS`;
export const VERIFY_FAIL = `${config.namespace}/VERIFY_FAIL`;

export const RESEND_VERIFY = `${config.namespace}/RESEND_VERIFY`;
export const RESEND_VERIFY_SUCCESS = `${config.namespace}/RESEND_VERIFY_SUCCESS`;
export const RESEND_VERIFY_FAIL = `${config.namespace}/RESEND_VERIFY_FAIL`;

/**
 *  User actions
 */
export const SET_CURRENT_USER = `${config.namespace}/SET_CURRENT_USER`;
