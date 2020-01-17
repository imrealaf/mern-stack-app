export default {
  auth_email_invalid: "Invalid credentials",
  auth_email_required: "Please include a valid email",
  auth_email_verify: "You must verify your account before logging in.",
  auth_email_verify_not_found: "We were unable to find a user for this token.",
  auth_email_verify_already:
    "The user assigned to this token has already been verified",
  auth_email_verify_success:
    "The account has been verified. You can now log in.",
  auth_email_resend_verify_notfound:
    "We were unable to find a user with that email",
  auth_social_email_exists(provider: string = "social provider's") {
    return `Your ${provider} account email is already assigned to a user in our system`;
  },
  auth_password_required: "Password is required",
  auth_verify_token_required: "No verification token sent",
  auth_email_resend_verify_required: "Email to send verification to is missing",
  auth_email_verify_fail:
    "Could not verify the account. The token is invalid or malformed"
};
