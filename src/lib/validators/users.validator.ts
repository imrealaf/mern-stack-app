import { check } from "express-validator";

import env from "../env";
import message from "../message";

export default {
  users_create: [
    check("name", message.get("users_name_required"))
      .not()
      .isEmpty(),
    check("email", message.get("users_email_required")).isEmail(),
    check("password", message.get("users_min_password_length")).isLength({
      min: env.get("AUTH_MIN_PASSWORD_LENGTH")
    })
  ],
  users_update: [
    check("name", message.get("users_name_required"))
      .not()
      .isEmpty()
  ],
  users_make_admin: [
    check("secret", message.get("users_admin_key_required"))
      .not()
      .isEmpty()
  ]
};
