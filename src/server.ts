import { Application } from "express";
import http, { Server } from "http";

import env from "./lib/env";

export default (app: Application) => {
  /**
   *  Create server
   */
  const server: Server = http.createServer(app);

  /**
   *  Configure port
   */
  const port: number = env.get("PORT");

  /**
   *  Start server
   */
  server.listen(port, (): void => {
    if (env.get("NODE_ENV") !== "test") {
      console.log(
        `Server is running${
          env.get("IS_SSL") ? " with SSL" : ""
        } on port ${port} in ${env.get("NODE_ENV")} mode for Process Id ${
          process.pid
        }`
      );
    }
  });

  /**
   *  Return server
   */
  return server;
};
