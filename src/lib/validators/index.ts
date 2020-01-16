import auth from "./auth.validator";
import users from "./users.validator";

/**
 *  Validator types
 */
export type Validator =
  | "auth_login"
  | "auth_verify"
  | "auth_resend_verify"
  | "users_create"
  | "users_update"
  | "users_make_admin"
  | ""
  | "";

/**
 *  Export combined validators
 */
export const validators: any = { ...global, ...auth, ...users };
