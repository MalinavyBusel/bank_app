import { JsonStorageManager } from "./json.manager.js";
import { StorageManager } from "./manager.js";
import { MongoStorageManager } from "./mongo.manager.js";

export class StorageCreator {
  public static new(): StorageManager {
    const dbArgument = process.argv.at(2);
    switch (dbArgument) {
      case "--mongo":
        return new MongoStorageManager();
      case "--json":
        return new JsonStorageManager();
      default:
        throw new Error("No argument for selecting database was provided");
    }
  }
}
