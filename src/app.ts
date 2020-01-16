import express, { Application } from "express";
import { env, loadVars } from "./env";

// Load env vars
loadVars();

import applyMiddleware from "./middleware";
import initRoutes from "./routes";
import initServer from "./server";
import { authService } from "./services/auth";
import { dbService } from "./services/db";

export const initApp = (): Application => {
  /**
   *  Create express app
   */
  const app: Application = express();

  /**
   *  Init authentication (if not in test env)
   */
  if (env("NODE_ENV") !== "test") authService.init(app);

  /**
   *  Init database (if not in test env)
   */
  if (env("NODE_ENV") !== "test") dbService.init();

  /**
   *  Apply middleware
   */
  applyMiddleware(app);

  /**
   *  Register routes
   */
  initRoutes(app);

  /**
   *  Init server
   */
  initServer(app);

  /**
   *  Return app
   */
  return app;
};
