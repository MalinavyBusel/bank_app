import { CommandResult } from "../command/command.js";

export interface Communicator {
  receive(obj?: unknown): Promise<string>;
  send<T>(data: CommandResult<T>, obj?: unknown): void;
}
