import mongoose from "mongoose";

import env from "../../env";
import { config, IDatabaseConfig } from "./database.config";

export interface IDatabaseService {
  config: IDatabaseConfig;
  init(): Promise<void>;
  connect(): Promise<typeof mongoose>;
  onConnectionError(message: string): void;
}

const DB_VENDOR = "MongoDB";

class DatabaseService implements IDatabaseService {
  public config: IDatabaseConfig = config;

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

  public connect() {
    return mongoose.connect(env.get("MONGO_URI"), this.config);
  }

  public onConnectionError(message: string) {
    console.log(message);
    process.exit(1);
  }
}

export const DbService = new DatabaseService();
