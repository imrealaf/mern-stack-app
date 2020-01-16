import { Application, NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Schema } from "mongoose";
import passport from "passport";

import env from "../../lib/env";
import message from "../../lib/message";
import { Token, User } from "../../models";
import { facebook, google, linkedIn } from "./providers";

/**
 *  Auth payload
 */
export interface IAuthUserPayload {
  id: Schema.Types.ObjectId;
  role: string;
  adminSecret?: string;
}

/**
 *  Auth request
 */
export interface IAuthRequest extends Request {
  user: IAuthUserPayload;
}

/**
 *  Auth service interface
 */
export interface IAuthenticationService {
  providers: any[];
  init(app: Application): void;
  middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}

/**
 *  Get bearer token from header function
 */
export const getBearerTokenFromHeader = (req: Request) => {
  const header = req.header("Authorization");
  return header && header.split(" ")[0].toLowerCase() === "bearer"
    ? header.split(" ")[1]
    : null;
};

/**
 *  Auth service
 */
class AuthenticationService implements IAuthenticationService {
  public providers: any[];

  constructor(providers: any[]) {
    this.providers = providers;
  }

  /**
   *  Init auth service
   */
  public init(app: Application) {
    /**
     *  Init passport
     */
    app.use(passport.initialize());

    /**
     *  Init providers
     */
    for (const provider of this.providers) {
      passport.use(provider);
    }
  }

  /**
   *  Auth middleware
   */
  public async middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    /*
     *  Get token
     */
    const token = getBearerTokenFromHeader(req);

    /**
     *  If no token ..
     */
    if (!token) {
      return res.status(401).json({ message: message.get("error_401") });
    }

    /**
     *  Try to verify token
     */
    try {
      await jwt.verify(
        token,
        env.get("JWT_SECRET"),
        async (error: JsonWebTokenError, decoded: any) => {
          /**
           *  If token not valid ..
           */
          if (error) {
            res.status(401).json({ message: message.get("error_401") });
          }

          /**
           *  If user is admin, extra check ..
           */
          if (decoded.user.adminSecret) {
            try {
              // Find token
              const foundToken = await Token.findOne({
                token: decoded.user.adminSecret
              });

              // If no token found ..
              if (!foundToken) {
                return res.status(404).json({
                  message: message.get("error_401")
                });
              }

              // Try to find user
              const user = await User.findById(foundToken.userId);

              // No user found for the token ..
              if (!user) {
                return res
                  .status(404)
                  .json({ message: message.get("error_401") });
              }

              // Return user
              req.user = decoded.user;
              next();
            } catch (error) {
              console.error(error.message);
              return res
                .status(500)
                .json({ message: message.get("error_500") });
            }

            /**
             *  Regular user ..
             */
          } else {
            // Return user
            req.user = decoded.user;
            next();
          }
        }
      );

      /**
       *  Server error
       */
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: message.get("error_500") });
    }
  }
}

/* Export service */
export const AuthService = new AuthenticationService([facebook, google]);
