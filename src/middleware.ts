import compression from "compression";
import cors, { CorsOptions } from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import env from "./env";

const MORGAN_MIDDLEWARE_CONFIG: string = "tiny";

const CORS_MIDDLEWARE_CONFIG: CorsOptions = {
  origin: [
    `http://localhost:${env.get("PORT")}`,
    `http://localhost:${env.get("CLIENT_PORT")}`
  ],
  // methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

const MIDDLEWARES_TO_LOAD = [
  morgan(MORGAN_MIDDLEWARE_CONFIG),
  cors(CORS_MIDDLEWARE_CONFIG),
  helmet(),
  compression(),
  express.json(),
  express.static(path.resolve(__dirname, "public"))
];

interface IMiddleware {
  collection: any[];
  apply(app: Application): void;
}

class Middleware implements IMiddleware {
  public collection: any[];

  constructor(collection: any = []) {
    this.collection = collection;
  }

  public apply(app: Application) {
    for (const middleware of this.collection) {
      app.use(middleware);
    }
  }
}

export default new Middleware(MIDDLEWARES_TO_LOAD);
