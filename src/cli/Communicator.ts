export interface Communicator {
  recieve: () => Promise<string>;
  send: (data: any) => void;
}
