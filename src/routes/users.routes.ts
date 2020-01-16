import { Router } from "express";

import controller from "../controllers/users.controller";
import { AuthService } from "../services/authentication";
import {
  validateCreateUser,
  validateMakeAdmin,
  validateUpdateUserProfile
} from "../validators/users.validator";

const router: Router = Router();

/**
 *  Get all users
 *
 *  @method GET
 *  @route  /api/users
 *  @access private
 */
router.get("/", AuthService.middleware, controller.get);

/**
 *  Get user by id
 *
 *  @method GET
 *  @route  /api/users:id
 *  @access private
 */
router.get("/:id", AuthService.middleware, controller.getById);

/**
 *  Create user
 *
 *  @method POST
 *  @route  /api/users
 *  @access private
 */
router.post("/", validateCreateUser, controller.create);

/**
 *  Update current user
 *
 *  @method PUT
 *  @route  /api/users
 *  @access private
 */
router.put(
  "/",
  AuthService.middleware,
  validateUpdateUserProfile,
  controller.update
);

/**
 *  Make user admin
 *
 *  @method PUT
 *  @route  /api/users/admin/:id
 *  @access public
 */
router.put("/admin/:id", validateMakeAdmin, controller.makeAdmin);

export default router;
