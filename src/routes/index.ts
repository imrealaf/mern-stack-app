import { Application, Request, Response } from "express";
import path from "path";

import env from "../lib/env";
import auth from "./auth.routes";
import users from "./users.routes";

/**
 *  Routes collection object
 */
const routes = {
  auth,
  users
} as any;

export default (app: Application) => {
  /**
   *  Bulk register auth & api routes
   */
  for (const route in routes) {
    if (routes.hasOwnProperty(route)) {
      app.use(
        `${route !== "auth" ? env.get("API_ROOT") : ""}/${route}`,
        routes[route]
      );
    }
  }

  /**
   *  If production, register client app route
   *  @desc serve static html file and route all other traffic back to index
   */
  if (env.get("NODE_ENV") === "production") {
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "../../client/build/index.html"));
    });
  }
};
