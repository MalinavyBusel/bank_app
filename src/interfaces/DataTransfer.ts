export interface DataTransfer {
  recieve: () => Promise<string>;
  send: (data: any) => void;
}
