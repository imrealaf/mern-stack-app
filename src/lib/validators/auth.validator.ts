import { check } from "express-validator";

export default {
  auth_login: [
    check("email", "Please include a valid email").isEmail(),
    check("password", `Password is required`).exists()
  ],
  auth_verify: [
    check("token", "No verification token sent")
      .not()
      .isEmpty()
  ],
  auth_resend_verify: [check("email", "Please include a valid email").isEmail()]
};
