import { Args } from "../promptparser/prompt-parser.js";

export interface Command<K, T> {
  getType: () => string;
  getName: () => string;
  validateArgs: (args: Args) => K;
  execute(args: K): Promise<CommandResult<T>>;
}

export type CommandResult<T> = {
  statusCode: CommandStatus;
  body: T;
};

export enum CommandStatus {
  Ok,
  Error,
  Exit,
}
