import { Application } from "express";
import http, { Server } from "http";

import { env } from "./env";

export default (app: Application) => {
  /**
   *  Create server
   */
  const server: Server = http.createServer(app);

  /**
   *  Configure port
   */
  const port: number = env("PORT");

  /**
   *  Start server
   */
  server.listen(port, (): void => {
    if (env("NODE_ENV") !== "test") {
      console.log(
        `Server is running on port ${port} in ${env(
          "NODE_ENV"
        )} mode for Process Id ${process.pid}`
      );
    }
  });

  /**
   *  Return server
   */
  return server;
};
