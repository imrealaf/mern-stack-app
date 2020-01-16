import crypto from "crypto";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import env from "../env";
import messages from "../messages/users.messages";
import { Token, User } from "../models";
import { IAuthRequest } from "../services/authentication";
import emailController from "./email.controller";

interface IUsersController {
  get(req: IAuthRequest, res: Response): Promise<Response>;
  getById(req: IAuthRequest, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
  update(req: IAuthRequest, res: Response): Promise<Response>;
  delete(req: IAuthRequest, res: Response): Promise<Response>;
  makeAdmin(req: Request, res: Response): Promise<Response>;
}

class UsersController implements IUsersController {
  /**
   *  Get all users
   *
   *  @method GET
   *  @route  /api/users
   *  @access private
   */
  public async get(req: IAuthRequest, res: Response) {
    /**
     *  Sorting query options
     */
    const sortBy = req.query.sortBy ? req.query.sortBy : "date";
    const sortDir = req.query.sortDir ? req.query.sortDir : "descending";

    /**
     *  Search query options
     */
    const search = {} as any;
    if (req.query.searchBy && req.query.searchFor) {
      search[req.query.searchBy] = req.query.searchFor;
    }

    /**
     *  Get all users based on query options ..
     */
    try {
      const users = await User.find(search)
        .select("-password")
        .sort([[sortBy, sortDir]]);

      /**
       *  If no users found ..
       */
      if (!users) {
        return res.status(404).json({ message: messages.error404("users") });
      }

      /**
       *  Users found, return results
       */
      return res.json({
        count: users.length,
        users
      });

      /**
       *  Server error occured
       */
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(messages.error500);
    }
  }

  /**
   *  Get user by id
   *
   *  @method GET
   *  @route  /api/users:id
   *  @access private
   */
  public async getById(req: IAuthRequest, res: Response) {
    /**
     *  Try to get user from ID param
     */
    try {
      const user = await User.findById(req.params.id).select("-password");

      /**
       *  Fail, user not found ..
       */
      if (!user) {
        return res.status(404).json({
          message: messages.error404("user")
        });
      }

      /**
       *  Success, return found user
       */
      return res.json(user);

      /**
       *  Server error occured
       */
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(messages.error500);
    }
  }

  /**
   *  Create user
   *
   *  @method POST
   *  @route  /api/users
   *  @access private
   */
  public async create(req: Request, res: Response) {
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
    const { email, password, name } = req.body;

    /**
     *  Check if user already exists ..
     */
    try {
      let user = await User.findOne({ email });

      /**
       *  If user exists ..
       */
      if (user) {
        return res.status(400).json({
          message: messages.create.userExists
        });
      }

      /**
       *  Create profile object
       */
      const profile = {
        name
      };

      /**
       *  Create user object
       */
      user = new User({
        email,
        password,
        profile
      });
      await user.save();

      /**
       *  If verification required: no auto-login
       */
      if (env.get("AUTH_REQUIRE_USER_VERIFY")) {
        /**
         *  Create & save verification token
         */
        const token = new Token({
          userId: user._id,
          token: crypto
            .randomBytes(env.get("AUTH_VERIFY_TOKEN_LENGTH"))
            .toString("hex")
        });
        await token.save();

        /**
         *  Send verification email
         */
        await emailController.sendVerificationEmail(req, user, token.token);

        /**
         *  Return token
         */
        return res.json({
          userId: user._id,
          verifyToken: token.token,
          message: messages.create.successVerify
        });

        /**
         *  No verification required: auto-login
         */
      } else {
        /**
         *  Create & sign JSON web token
         */
        jwt.sign(
          // Payload
          {
            user: user._id
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

      // Server error ..
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(messages.error500);
    }
  }

  /**
   *  Update current user
   *
   *  @method PUT
   *  @route  /api/users
   *  @access private
   */
  public async update(req: IAuthRequest, res: Response) {
    // Get errors array
    const errors = validationResult(req);

    // If errors, send 400 ..
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      let user = await User.findById(req.user.id);

      // Destructure data
      const {
        name,
        gender,
        location,
        website,
        facebook,
        instagram,
        twitter,
        youtube
      } = req.body;

      // Start building user object ..
      const fields = {
        profile: {
          ...user.profile,
          name
        }
      } as any;

      // Profile fields
      if (gender) {
        fields.profile.gender = gender;
      }
      if (location) {
        fields.profile.location = location;
      }
      if (website) {
        fields.profile.website = website;
      }
      if (facebook) {
        fields.profile.facebook = facebook;
      }
      if (instagram) {
        fields.profile.instagram = instagram;
      }
      if (twitter) {
        fields.profile.twitter = twitter;
      }
      if (youtube) {
        fields.profile.youtube = youtube;
      }

      // Update user
      try {
        user = await User.findByIdAndUpdate(
          req.user.id,
          { $set: fields },
          { new: true }
        );

        // Return user
        return res.json(user);

        // Server error ..
      } catch (error) {
        console.error(error.message);
        return res.status(500).send(messages.error500);
      }

      // Server error ..
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(messages.error500);
    }
  }

  /**
   *  Delete user
   *
   *  @method DELETE
   *  @route  /api/users/:id
   *  @access private
   */
  public async delete(req: IAuthRequest, res: Response) {
    try {
      // Remove profile
      await User.findOneAndRemove({
        _id: req.user.id
      });

      return res.json({ message: messages.successDelete("user") });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(messages.error500);
    }
  }

  /**
   *  Make admin
   *
   *  @method PUT
   *  @route  /api/users/admin/:id
   *  @access private
   */
  public async makeAdmin(req: Request, res: Response) {
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
    const { secret } = req.body;

    if (secret === env.get("ADMIN_SECRET")) {
      /**
       *  Try to get user from ID param
       */
      try {
        const user = await User.findById(req.params.id).select("-password");

        /**
         *  Fail, user not found ..
         */
        if (!user) {
          return res.status(404).json({
            message: messages.error404("user")
          });
        }

        /**
         *  Create & save verification token
         */
        const token = new Token({
          userId: user._id,
          token: crypto
            .randomBytes(env.get("AUTH_ADMIN_TOKEN_LENGTH"))
            .toString("hex")
        });
        await token.save();

        /**
         *  Update user properties
         */
        user.role = "admin";
        user.adminSecret = token.token;
        await user.save();

        /**
         *  Return token
         */
        return res.json({
          secret: token.token,
          message: "User has been upgraded to admin"
        });

        /**
         *  Server error occured
         */
      } catch (error) {
        console.error(error.message);
        return res.status(500).send(messages.error500);
      }
    } else {
      return res.status(401).json({ message: messages.error401 });
    }
  }
}

export default new UsersController();
