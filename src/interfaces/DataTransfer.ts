export interface DataTransfer {
  recieve: () => Promise<string>;
  send: (data: string) => void;
}
