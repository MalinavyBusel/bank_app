import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { StorageManager } from "./manager.js";
import { RepoFactory } from "./factory/factory.js";
import { MongoRepoFactory } from "./factory/mongo.factory.js";
dotenv.config();

export class MongoStorageManager implements StorageManager {
  public async connect(): Promise<void> {
    const url = process.env.MONGO_URL;
    if (url === undefined) {
      throw new Error("unable to connect to given address");
    }
    await mongoose.connect(url, { serverSelectionTimeoutMS: 5000 });
  }

  public async close(): Promise<void> {
    await mongoose.connection.close();
  }

  public newRepoFactory(): RepoFactory {
    return new MongoRepoFactory();
  }
}
