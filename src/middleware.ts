import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import config from "./config/middleware.config";

export default (app: Application) => {
  /**
   *  Logging
   */
  app.use(morgan(config.morgan));

  /**
   *  CORS
   */
  app.use(cors(config.cors));

  /**
   *  Security and protection
   */
  app.use(helmet());

  /**
   *  Compressed responses
   */
  app.use(compression());

  /**
   *  Enable JSON body response
   */
  app.use(express.json());

  /**
   *  Serve static files for client
   */
  app.use(express.static(path.resolve(__dirname, "public")));
};
