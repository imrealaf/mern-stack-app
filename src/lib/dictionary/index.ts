import auth from "./auth.messages";
import global from "./global.messages";
import users from "./users.messages";

/**
 *  Dictionary definition keys
 */
export type DictionaryDefinition =
  | "error_401"
  | "error_404"
  | "error_500"
  | "delete_success"
  | "auth_email_invalid"
  | "auth_email_required"
  | "auth_email_verify"
  | "auth_email_verify_not_found"
  | "auth_email_verify_already"
  | "auth_email_verify_success"
  | "auth_email_resend_verify_notfound"
  | "auth_social_email_exists"
  | "auth_password_required"
  | "auth_verify_token_required"
  | "auth_email_resend_verify_required"
  | "users_create_exists"
  | "users_success_verify"
  | "users_make_admin_success"
  | "users_email_required"
  | "users_name_required"
  | "users_min_password_length"
  | "users_admin_key_required"
  | "";

/**
 *  Export combined definitions
 */
export const dictionary: any = { ...global, ...auth, ...users };
