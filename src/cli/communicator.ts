export interface Communicator {
  recieve: () => Promise<string>;
  send<T>(data: T): void;
}
