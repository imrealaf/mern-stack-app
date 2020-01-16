import express, { Application } from "express";
import env from "./env";

env.init();

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
   *  Init database (if not in test env)
   */
  if (env.get("NODE_ENV") !== "test") dbService.init();

  /**
   *  Init authentication (if not in test env)
   */
  if (env.get("NODE_ENV") !== "test") authService.init(app);

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
