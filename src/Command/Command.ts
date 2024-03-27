import { ValidatedArgs } from "../ArgValidator/ArgValidator.js";
import { Args } from "../PromptParser/PromptParser.js";

export interface Command {
  getType: () => string;
  getName: () => string;
  validateArgs: (args: Args) => ValidatedArgs;
  execute: () => string;
}
