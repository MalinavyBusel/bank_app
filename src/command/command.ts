import { ValidatedArgs } from "../argvalidator/arg-validator.js";
import { Provider } from "../storage/provider/provider.js";
import { Args } from "../promptparser/prompt-parser.js";

export interface Command {
  readonly provider: Provider;
  getType: () => string;
  getName: () => string;
  validateArgs: (args: Args) => ValidatedArgs;
  execute(_args: ValidatedArgs): Promise<CommandResult<unknown>>;
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
