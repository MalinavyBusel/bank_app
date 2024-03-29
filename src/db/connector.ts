export interface DatabaseConnector {
  connect: () => void;
  close: () => void;
}
