import { ValidatedArgs } from "../argvalidator/arg-validator.js";
import { Args } from "../promptparser/prompt-parser.js";

export interface Command {
  getType: () => string;
  getName: () => string;
  validateArgs: (args: Args) => ValidatedArgs;
  execute(_args: ValidatedArgs): CommandResult<unknown>;
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
