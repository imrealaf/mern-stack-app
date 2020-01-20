import compression from "compression";
import cors, { CorsOptions } from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import env from "./lib/env";

/**
 *  Morgan config
 */
const MORGAN_MIDDLEWARE_CONFIG: string = "tiny";

/**
 *  CORS config
 */
const CORS_MIDDLEWARE_CONFIG: CorsOptions = {
  origin: [
    `http${env.get("IS_SSL") ? "s" : ""}://localhost:${env.get("PORT")}`,
    `http://localhost:${env.get("CLIENT_PORT")}`
  ],
  allowedHeaders: ["Content-Type", "Authorization"]
};

/**
 *  Export middlewares to load
 */
export const middlewaresToLoad = [
  morgan(MORGAN_MIDDLEWARE_CONFIG),
  cors(CORS_MIDDLEWARE_CONFIG),
  helmet(),
  compression(),
  express.json(),
  express.static(path.resolve(__dirname, "../client/build"))
];
