import { RepoFactory } from "./factory/factory.js";
import { JsonRepoFactory } from "./factory/json.factory.js";
import { StorageManager } from "./manager.js";
// import fs from 'node:fs/promises';
// import { cwd } from 'node:process';

export class JsonStorageManager implements StorageManager {
  public async connect(): Promise<void> {}

  public async close(): Promise<void> {}

  public newRepoFactory(): RepoFactory {
    return new JsonRepoFactory();
  }
}
