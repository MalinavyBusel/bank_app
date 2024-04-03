import { Provider } from "./provider/provider.js";

export interface StorageManager {
  connect: () => void;
  close: () => void;
  newProvider: () => Provider;
}
