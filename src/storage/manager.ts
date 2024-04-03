import { RepoFactory } from "./factory/factory.js";

export interface StorageManager {
  connect: () => void;
  close: () => void;
  newRepoFactory: () => RepoFactory;
}
