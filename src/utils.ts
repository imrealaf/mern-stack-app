import { Request } from "express";

import { env } from "./env";

/**
 *  Get client base
 *  @desc useful to figure out redirect root when in development mode
 */
export const getClientBase = (): string => {
  return env("NODE_ENV") === "development"
    ? `http://localhost:${env("CLIENT_PORT")}`
    : "";
};

/**
 *  Get base url
 *  @desc useful to determine host based on environment
 */
export const getBaseUrl = (req: Request): string => {
  const protocol = "http";
  const host =
    env("NODE_ENV") === "production"
      ? req.headers.host
      : `localhost:${env("CLIENT_PORT")}`;

  return `${protocol}://${host}`;
};
