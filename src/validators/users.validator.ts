import { check } from "express-validator";

import env from "../env";

export const validateCreateUser = [
  check("name", "Please enter your name")
    .not()
    .isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    `Please enter a password with ${env.get(
      "AUTH_MIN_PASSWORD_LENGTH"
    )} or more characters`
  ).isLength({ min: env.get("AUTH_MIN_PASSWORD_LENGTH") })
];

export const validateUpdateUserProfile = [
  check("name", "Please enter your name")
    .not()
    .isEmpty()
];

export const validateMakeAdmin = [
  check("secret", "Secret key is needed")
    .not()
    .isEmpty()
];
