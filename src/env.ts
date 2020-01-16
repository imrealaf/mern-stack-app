import dotenv from "dotenv-flow";

import * as defaults from "./defaults";

export type EnvVariable =
  | "PORT"
  | "NODE_ENV"
  | "DEFAULT_PORT"
  | "CLIENT_PORT"
  | "API_ROOT"
  | "APP_NAME"
  | "MONGO_URI"
  | "JWT_SECRET"
  | "JWT_ADMIN_SECRET"
  | "JWT_EXPIRY"
  | "EMAIL_API_KEY"
  | "EMAIL_FROM_EMAIL"
  | "EMAIL_FROM_NAME"
  | "AUTH_REQUIRE_USER_VERIFY"
  | "FACEBOOK_CLIENT_ID"
  | "FACEBOOK_CLIENT_SECRET"
  | "FACEBOOK_CALLBACK_URL"
  | "LINKEDIN_CLIENT_ID"
  | "LINKEDIN_CLIENT_SECRET"
  | "LINKEDIN_CALLBACK_URL"
  | "GOOGLE_CLIENT_ID"
  | "GOOGLE_CLIENT_SECRET"
  | "GOOGLE_CALLBACK_URL"
  | "ADMIN_SECRET"
  | "AUTH_MIN_PASSWORD_LENGTH"
  | "AUTH_VERIFY_TOKEN_LENGTH"
  | "AUTH_ADMIN_TOKEN_LENGTH";

interface IEnv {
  defaults: any;
  init(): void;
  get(key: EnvVariable): any;
}

class Env implements IEnv {
  /**
   *  Default values
   */
  public defaults: any = defaults;

  /**
   *  Init
   */
  public init() {
    if (process.env.NODE_ENV !== "production") {
      dotenv.config();
    }
  }

  /**
   *  Get var
   */
  public get(key: EnvVariable) {
    if (key && typeof process.env[key] !== undefined) {
      let value = process.env[key] as any | undefined;

      /**
       *  If key has value ..
       */
      if (value) {
        /**
         *  Parse boolean: true
         */
        if (value === "true" || value === "TRUE") {
          value = true;
        }

        /**
         *  Parse boolean: false
         */
        if (value === "false" || value === "FALSE") {
          value = false;
        }

        /**
         *  Parse number
         */
        const re = /{0-9}/g;
        if (re.test(value) && !isNaN(value)) {
          value = parseInt(value);
        }

        /**
         *  Else try to find default
         */
      } else if (typeof this.defaults[key] !== undefined) {
        value = this.defaults[key];
      }

      return value;
    }
  }
}

export default new Env();
