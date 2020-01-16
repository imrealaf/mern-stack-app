import dotenv from "dotenv";

import * as defaults from "./defaults";
import { EnvVariable } from "./env.vars";

/**
 *  Get & parse env variable w/ fallback
 */
export const env = (key: EnvVariable) => {
  if (key && typeof process.env[key] !== undefined) {
    let value = process.env[key] as any | undefined;
    const defaultValues = defaults as any;

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
    } else if (typeof defaultValues[key] !== undefined) {
      value = defaultValues[key];
    }

    return value;
  }
};

/**
 *  Load env vars
 */
export const loadVars = () => {
  if (env("NODE_ENV") === "development") {
    dotenv.config();
  }
};
