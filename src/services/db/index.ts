import mongoose from "mongoose";

import config from "../../config/mongo.config";
import env from "../../env";

export interface IDBService {
  init(): Promise<void>;
  connect(): Promise<typeof mongoose>;
  onConnectionError(message: string): void;
}

class DbService implements IDBService {
  public async init() {
    /**
     *  Try to connect to DB ..
     */
    try {
      await this.connect();
      console.log("MongoDB connected..");

      /**
       *  Connection error ..
       */
    } catch (error) {
      this.onConnectionError(error.message);
    }
  }

  public connect() {
    return mongoose.connect(env.get("MONGO_URI"), config);
  }

  public onConnectionError(message: string) {
    console.log(message);
    process.exit(1);
  }
}

export const dbService = new DbService();
