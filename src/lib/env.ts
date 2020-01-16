import dotenv from "dotenv-flow";

import defaults from "../defaults";
import { EnvVariable } from "./env.vars";

/**
 *  Env interface
 */
interface IEnv {
  defaults: any;
  init(): void;
  get(key: EnvVariable): any;
}

/**
 *  Env instance
 */
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

/* Export */
export default new Env();
