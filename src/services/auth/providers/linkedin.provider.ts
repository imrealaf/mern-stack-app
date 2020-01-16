import {
  Strategy,
  StrategyOptionWithRequest,
  VerifyFunctionWithRequest
} from "passport-linkedin-oauth2";

import { env } from "../../../env";
import messages from "../../../messages/auth.messages";
import { User } from "../../../models";

const config: StrategyOptionWithRequest = {
  clientID: env("LINKEDIN_CLIENT_ID"),
  clientSecret: env("LINKEDIN_CLIENT_SECRET"),
  callbackURL: env("LINKEDIN_CALLBACK_URL"),
  passReqToCallback: true
};

const verify: VerifyFunctionWithRequest = async (
  request: any,
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
) => {
  console.log(profile); //

  /**
   *  Destructure data from profile
   */
  const { id, email } = profile;

  console.log(email);

  /**
   *  Try to find user with LinkedIn ID
   */
  try {
    const linkedinUser = await User.findOne({ linkedinId: id });

    /**
     *  No user found with LinkedIn ID
     */
    if (!linkedinUser) {
      /**
       *  Check if user already exists with LinkedIn profile email
       */
      const emailExists = await User.findOne({ email });

      /**
       *  User with LinkedIn profile email already exists
       */
      if (emailExists) {
        return done(undefined, false, {
          message: messages.social.emailExists("LinkedIn")
        });

        /**
         *  Create & save new user with LinkedIn ID
         */
      } else {
        const newUser = new User({
          email,
          linkedinId: id,
          profile: {
            // name: given_name || displayName,
            // photo: picture
          }
        });

        await newUser.save();
        return done(undefined, newUser);
      }

      /**
       *  User with LinkedIn ID was found
       */
    } else {
      return done(undefined, linkedinUser);
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
