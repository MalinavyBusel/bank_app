import { ValidatedArgs } from "..//ArgValidator/ArgValidator.js";

export interface Command {
  getType: () => string;
  getName: () => string;
  validateArgs: (args: string[]) => ValidatedArgs;
  execute: () => string;
}
