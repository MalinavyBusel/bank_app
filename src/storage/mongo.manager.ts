import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { StorageManager } from "./manager.js";
import { Provider } from "./provider/provider.js";
import { MongoProvider } from "./provider/mongo.provider.js";
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

  public newProvider(): Provider {
    return new MongoProvider();
  }
}
