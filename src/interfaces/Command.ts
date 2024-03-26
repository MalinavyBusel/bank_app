import { validatedArgs } from "../modules/Command/ArgParser.js";

export interface Command {
  getType: () => string;
  getName: () => string;
  parseArgs: (args: string[]) => validatedArgs;
  execute: () => string;
}
