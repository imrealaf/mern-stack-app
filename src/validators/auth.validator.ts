import { check } from "express-validator";

export const validateLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", `Password is required`).exists()
];

export const validateVerify = [
  check("token", "No verification token sent")
    .not()
    .isEmpty()
];

export const validateResendVerify = [
  check("email", "Please include a valid email").isEmail()
];
