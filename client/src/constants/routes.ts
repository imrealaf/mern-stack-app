import config from "./config";

/////////////////////// F R O N T - E N D //////////////////////

/**
 *  Public
 */
export const LANDING = "/";
export const LOGIN = "/login";
export const SIGN_UP = "/sign-up";
export const VERIFY = "/verify/:token";
export const RESEND_VERIFY = "/resend-verify";

/**
 *  Private
 */
export const DASHBOARD = "/dashboard";

/////////////////////// B A C K - E N D //////////////////////

export const ADMIN_DASHBOARD = "/admin";
export const ADMIN_USERS = "/admin/users";

/////////////////////// A U T H //////////////////////

export const AUTH = `/auth`;
export const AUTH_EMAIL = `/auth/email`;
export const AUTH_ADMIN = `/auth/admin`;
export const AUTH_GOOGLE = `/auth/google`;
export const AUTH_FACEBOOK = `/auth/facebook`;
export const AUTH_LINKEDIN = `/auth/linkedin`;
export const AUTH_APPLE = `/auth/apple`;
export const AUTH_INSTAGRAM = `/auth/instagram`;
export const AUTH_VERIFY = `/auth/verify`;
export const AUTH_RESEND_VERIFY = `/auth/resend-verify`;
export const AUTH_SUCCESS = `/auth/success/:token`;

/////////////////////// A P I //////////////////////

/**
 *  API - Users
 */
export const API_USERS = `${config.apiBase}/users`;
export const API_USERS_VERIFY = `${config.apiBase}/users/verify`;
