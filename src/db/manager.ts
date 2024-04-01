import { Provider } from "./provider/provider.js";

export interface DatabaseManager {
  connect: () => void;
  close: () => void;
  newProvider: () => Provider;
}
