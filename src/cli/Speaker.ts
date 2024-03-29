export interface Speaker {
  recieve: () => Promise<string>;
  send: (data: any) => void;
}
