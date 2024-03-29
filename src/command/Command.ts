import { ValidatedArgs } from "../argvalidator/ArgValidator.js";
import { Args } from "../promptparser/PromptParser.js";

export interface Command {
  getType: () => string;
  getName: () => string;
  validateArgs: (args: Args) => ValidatedArgs;
  execute: () => CommandResult;
}

export type CommandResult = {
  statusCode: CommandStatus
  body: string
}

export enum CommandStatus {
  Ok,
  Error,
  Exit
}
