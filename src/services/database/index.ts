import mongoose from "mongoose";

import env from "../../lib/env";
import { config, IDatabaseConfig } from "./database.config";

/**
 *  Database service interface
 */
export interface IDatabaseService {
  config: IDatabaseConfig;
  init(): Promise<void>;
  connect(): Promise<typeof mongoose>;
  onConnectionError(message: string): void;
}

/**
 *  Database vendor
 */
const DB_VENDOR = "MongoDB";

/**
 *  Database service
 */
class DatabaseService implements IDatabaseService {
  public config: IDatabaseConfig = config;

  /**
   *  Init db connection
   */
  public async init() {
    /**
     *  Try to connect to DB ..
     */
    try {
      await this.connect();
      console.log(`Database [${DB_VENDOR}] connected..`);

      /**
       *  Connection error ..
       */
    } catch (error) {
      this.onConnectionError(error.message);
    }
  }

  /**
   *  Connect to db
   */
  public connect() {
    return mongoose.connect(env.get("MONGO_URI"), this.config);
  }

  /**
   *  Connection error handler
   */
  public onConnectionError(message: string) {
    console.log(message);
    process.exit(1);
  }
}

/* Export service */
export const DbService = new DatabaseService();
