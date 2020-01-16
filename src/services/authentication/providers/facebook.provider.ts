import {
  Strategy,
  StrategyOptionWithRequest,
  VerifyFunctionWithRequest
} from "passport-facebook";

import env from "../../../lib/env";
import message from "../../../lib/message";
import { User } from "../../../models";

const config: StrategyOptionWithRequest = {
  clientID: env.get("FACEBOOK_CLIENT_ID"),
  clientSecret: env.get("FACEBOOK_CLIENT_SECRET"),
  callbackURL: env.get("FACEBOOK_CALLBACK_URL"),
  passReqToCallback: true,
  profileFields: ["id", "displayName", "photos", "email", "gender", "name"]
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
  const { id, emails, name, displayName, photos } = profile;
  const email = emails[0].value;
  const photo = photos[0].value;

  /**
   *  Try to find user with Facebook ID
   */
  try {
    const facebookUser = await User.findOne({ facebookId: id });

    /**
     *  No user found with Facebook ID
     */
    if (!facebookUser) {
      /**
       *  Check if user already exists with Facebook profile email
       */
      const emailExists = await User.findOne({ email });

      /**
       *  User with Facebook profile email already exists
       */
      if (emailExists) {
        return done(undefined, false, {
          message: message.get("auth_social_email_exists", "Facebook")
        });

        /**
         *  Create & save new user with Facebook ID
         */
      } else {
        const newUser = new User({
          email,
          facebookId: id,
          profile: {
            name: name.givenName || displayName,
            photo
          }
        });

        await newUser.save();
        return done(undefined, newUser);
      }

      /**
       *  User with Facebook ID was found
       */
    } else {
      return done(undefined, facebookUser);
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
