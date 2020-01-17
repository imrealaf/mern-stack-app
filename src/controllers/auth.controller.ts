import crypto from "crypto";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import env from "../lib/env";
import message from "../lib/message";
import { getClientBase } from "../lib/utils";
import { Token, User } from "../models";
import { IAuthRequest } from "../services/authentication";
import emailController from "./email.controller";

interface IAuthController {
  getCurrentUser(req: IAuthRequest, res: Response): Promise<Response>;
  loginWithEmail(req: Request, res: Response): Promise<Response>;
  verifyUser(req: Request, res: Response): Promise<Response>;
  resendVerify(req: Request, res: Response): Promise<Response>;
  loginWithProviderSuccess(req: Request, res: Response): Promise<Response>;
  loginWithProviderFail(req: Request, res: Response): Promise<void>;
}

class AuthController implements IAuthController {
  /**
   *  Get current user
   *
   *  @method GET
   *  @route  /auth
   *  @access public
   */
  public async getCurrentUser(req: IAuthRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id).select("-password");
      return res.json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(message.get("error_500"));
    }
  }

  /**
   *  Login with email/password
   *
   *  @method POST
   *  @route  /auth/email
   *  @access public
   */
  public async loginWithEmail(req: Request, res: Response) {
    /**
     *  Get validation errors
     */
    const errors = validationResult(req);

    /**
     *  If errors found, return 404
     */
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    /**
     *  Destructure data
     */
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      /**
       *  If user not found
       */
      if (!user) {
        return res
          .status(400)
          .json({ message: message.get("auth_email_invalid") });
      }

      /**
       *  Compare password
       */
      const isMatch = await user.comparePassword(password);

      /**
       *  If password doesn't mamtch
       */
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: message.get("auth_email_invalid") });
      }

      /**
       *  Check if user is verified
       */
      if (env.get("AUTH_REQUIRE_USER_VERIFY") && !user.emailIsVerified) {
        return res
          .status(400)
          .json({ message: message.get("auth_email_verify") });
      }

      /**
       *  If admin, perform special check ..
       */
      if (user.role === "admin" && user.adminSecret) {
        // Find token
        const foundToken = await Token.findOne({
          token: user.adminSecret
        });

        // If no token found ..
        if (!foundToken) {
          return res.status(404).json({
            message: message.get("error_404", "token")
          });
        }

        // Try to find user
        const foundUser = await User.findById(foundToken.userId);

        // No user found for the token ..
        if (!foundUser) {
          return res
            .status(404)
            .json({ message: message.get("error_404", "user") });
        }

        /**
         *  Generate special admin JWT ..
         */
        jwt.sign(
          // Payload
          {
            user: {
              id: user._id,
              adminSecret: user.adminSecret
            }
          },

          // Secret
          env.get("JWT_SECRET"),

          // Expiration
          { expiresIn: env.get("JWT_EXPIRY") },

          // Callback
          (err, token) => {
            if (err) {
              throw err;
            }
            return res.json({ token, isAdmin: true });
          }
        );

        /**
         *  If regular login ..
         */
      } else {
        jwt.sign(
          // Payload
          {
            user: {
              id: user._id
            }
          },

          // Secret
          env.get("JWT_SECRET"),

          // Expiration
          { expiresIn: env.get("JWT_EXPIRY") },

          // Callback
          (err, token) => {
            if (err) {
              throw err;
            }
            return res.json({ token, isAdmin: false });
          }
        );
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send(message.get("error_500"));
    }
  }

  /**
   *  Verify user
   *
   *  @method POST
   *  @route  /auth/verify
   *  @access public
   */
  public async verifyUser(req: Request, res: Response) {
    /**
     *  Get validation errors
     */
    const errors = validationResult(req);

    /**
     *  If errors found, return 404
     */
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    /**
     *  Destructure data from request body
     */
    const { token } = req.body;

    try {
      // Find token
      const foundToken = await Token.findOne({ token });

      // If no token found ..
      if (!foundToken) {
        return res.status(404).json({
          message: message.get("error_404", "token")
        });
      }

      // Try to find user
      const user = await User.findById(foundToken.userId);

      // No user found for the token ..
      if (!user) {
        return res
          .status(404)
          .json({ message: message.get("auth_email_verify_not_found") });
      }

      // If user is already verified ..
      if (user.emailIsVerified) {
        return res.status(400).json({
          message: message.get("auth_email_verify_already")
        });
      }

      user.emailIsVerified = true;
      await user.save();

      res.json({ message: message.get("auth_email_verify_success") });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        message: message.get("error_401")
      });
    }
  }

  /**
   *  Resend verification token
   *
   *  @method POST
   *  @route  /auth/resend-verify
   *  @access public
   */
  public async resendVerify(req: Request, res: Response) {
    // Get errors array
    const errors = validationResult(req);

    // If errors, send 400 ..
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    // Destructure data
    const { email } = req.body;

    try {
      // Find token
      const user = await User.findOne({ email });

      // If no user found ..
      if (!user) {
        return res.status(404).json({
          message: message.get("auth_email_resend_verify_notfound")
        });
      }

      // Delete all previous token
      await Token.findOneAndDelete({ userId: user._id });

      // Create & save new verification token
      const token = new Token({
        userId: user._id,
        token: crypto
          .randomBytes(env.get("AUTH_VERIFY_TOKEN_LENGTH"))
          .toString("hex")
      });
      await token.save();

      // Send verification email
      await emailController.sendVerificationEmail(req, user, token.token);

      // Return token
      return res.json({ verifyToken: token.token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(message.get("error_500"));
    }
  }

  /**
   *  Login with Provider: Success
   *
   *  @method GET
   *  @route  /{provider}/callback
   *  @access public
   */
  public async loginWithProviderSuccess(req: Request, res: Response) {
    const { user } = req as any;

    /**
     *  Login success, generate JWT and send back
     */
    try {
      jwt.sign(
        // Payload
        {
          user: {
            id: user._id
          }
        },

        // Secret
        env.get("JWT_SECRET"),

        // Expiration
        { expiresIn: env.get("JWT_EXPIRY") },

        // Callback
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.redirect(`${getClientBase()}/auth/success/${token}`);
        }
      );
    } catch (error) {
      return res.send(500);
    }
  }

  /**
   *  Login with Provider: Success
   *
   *  @method GET
   *  @route  /provider/fail
   *  @access public
   */
  public async loginWithProviderFail(req: Request, res: Response) {
    return res.redirect(`${getClientBase()}/login?status=fail`);
  }
}

export default new AuthController();
