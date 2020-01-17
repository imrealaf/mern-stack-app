import env from "../env";

export default {
  users_create_exists: "The email you provided is already assigned to a user",
  users_create_success_verify:
    "Thanks for signing up!<br/> We've sent you an email to verify your account before logging in",
  users_make_admin_success: "User has been upgraded to admin",
  users_email_required: "Email is required",
  users_name_required: "Please enter your name",
  users_min_password_length: `Please enter a password with ${env.get(
    "AUTH_MIN_PASSWORD_LENGTH"
  )} or more characters`,
  users_admin_key_required: "Secret key is needed to make user admin"
};
