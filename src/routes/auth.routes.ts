import { Router } from "express";
import passport from "passport";

import controller from "../controllers/auth.controller";
import validation from "../lib/validation";
import { AuthService } from "../services/authentication";

const router: Router = Router();

/**
 *  Get current user
 *
 *  @method GET
 *  @route  /auth
 *  @access private
 */
router.get("/", AuthService.middleware, controller.getCurrentUser);

/**
 *  Login with email
 *
 *  @method POST
 *  @route  /auth/email
 *  @access public
 */
router.post("/email", validation.use("auth_login"), controller.loginWithEmail);

/**
 *  Verify user
 *
 *  @method POST
 *  @route  /api/users/verify/:token
 *  @access public
 */
router.post("/verify", validation.use("auth_verify"), controller.verifyUser);

/**
 *  Resend verification token
 *
 *  @method POST
 *  @route  /api/users/resend-verify
 *  @access public
 */
router.post(
  "/resend-verify",
  validation.use("auth_resend_verify"),
  controller.resendVerify
);

/**
 *  Login with Google
 *
 *  @method GET
 *  @route  /auth/google
 *  @access public
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

/**
 *  Google auth callback
 *
 *  @method GET
 *  @route  /auth/google/callback
 *  @access public
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/provider/fail"
  }),
  controller.loginWithProviderSuccess
);

/**
 *  Login with Facebook
 *
 *  @method GET
 *  @route  /auth/facebook
 *  @access public
 */
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: "email"
  })
);

/**
 *  Facebook auth callback
 *
 *  @method GET
 *  @route  /auth/facebook/callback
 *  @access public
 */
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/auth/provider/fail"
  }),
  controller.loginWithProviderSuccess
);

/**
 *  Login with LinkedIn
 *
 *  @method GET
 *  @route  /auth/linkedin
 *  @access public
 */
router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"]
  })
);

/**
 *  LinkedIn auth callback
 *
 *  @method GET
 *  @route  /auth/linkedin/callback
 *  @access public
 */
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    session: false,
    failureRedirect: "/auth/provider/fail"
  }),
  controller.loginWithProviderSuccess
);

/**
 *  Auth provider fail
 *
 *  @method GET
 *  @route  /auth/provider/fail
 *  @access public
 */
router.get("/provider/fail", controller.loginWithProviderFail);

export default router;
