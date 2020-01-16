import express, { Application } from "express";
import env from "./lib/env";

env.init();

import middleware from "./lib/middleware";
import { middlewaresToLoad } from "./middlewares";
import initRoutes from "./routes";
import initServer from "./server";
import { AuthService } from "./services/authentication";
import { DbService } from "./services/database";

export const initApp = (): Application => {
  /**
   *  Create express app
   */
  const app: Application = express();

  /**
   *  Proxy settings to account for reverse-proxy environment
   */
  app.set("trust proxy", 1);

  /**
   *  Init database (if not in test env)
   */
  if (env.get("NODE_ENV") !== "test") DbService.init();

  /**
   *  Init authentication (if not in test env)
   */
  if (env.get("NODE_ENV") !== "test") AuthService.init(app);

  /**
   *  Apply middleware
   */
  middleware.load(middlewaresToLoad);
  middleware.apply(app);

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
