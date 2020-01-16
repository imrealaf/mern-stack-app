import {
  Strategy,
  StrategyOptionsWithRequest,
  VerifyFunctionWithRequest
} from "passport-google-oauth2";

import env from "../../../env";
import messages from "../../../messages/auth.messages";
import { User } from "../../../models";

const config: StrategyOptionsWithRequest = {
  clientID: env.get("GOOGLE_CLIENT_ID"),
  clientSecret: env.get("GOOGLE_CLIENT_SECRET"),
  callbackURL: env.get("GOOGLE_CALLBACK_URL"),
  passReqToCallback: true
};

const verify: VerifyFunctionWithRequest = async (
  request: any,
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
) => {
  /**
   *  Destructure data from profile
   */
  const { id, email, given_name, displayName, picture } = profile;

  /**
   *  Try to find user with Google ID
   */
  try {
    const googleUser = await User.findOne({ googleId: id });

    /**
     *  No user found with Google ID
     */
    if (!googleUser) {
      /**
       *  Check if user already exists with Google profile email
       */
      const emailExists = await User.findOne({ email });

      /**
       *  User with Google profile email already exists
       */
      if (emailExists) {
        return done(undefined, false, {
          message: messages.social.emailExists("Google")
        });

        /**
         *  Create & save new user with Google ID
         */
      } else {
        const newUser = new User({
          email,
          googleId: id,
          profile: {
            name: given_name || displayName,
            photo: picture
          }
        });

        await newUser.save();
        return done(undefined, newUser);
      }

      /**
       *  User with Google ID was found
       */
    } else {
      return done(undefined, googleUser);
    }

    /**
     *  Server error
     */
  } catch (error) {
    console.error(error.message);
    return done(error);
  }
};

export default new Strategy(config, verify);
