import { Router } from "express";

import controller from "../controllers/users.controller";
import { authService } from "../services/auth";
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
router.get("/", authService.middleware, controller.get);

/**
 *  Get user by id
 *
 *  @method GET
 *  @route  /api/users:id
 *  @access private
 */
router.get("/:id", authService.middleware, controller.getById);

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
  authService.middleware,
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
