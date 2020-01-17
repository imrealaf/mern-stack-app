import { check } from "express-validator";

import message from "../message";

export default {
  auth_login: [
    check("email", message.get("auth_email_required")).isEmail(),
    check("password", message.get("auth_password_required"))
      .not()
      .isEmpty()
  ],
  auth_verify: [
    check("token", message.get("auth_verify_token_required"))
      .not()
      .isEmpty()
  ],
  auth_resend_verify: [
    check("email", message.get("auth_email_resend_verify_required")).isEmail()
  ]
};
