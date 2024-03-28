import { Args } from "../PromptParser/PromptParser.js";

export abstract class ArgValidator {
  protected abstract options: ArgsOptions;
  validateArgs(args: Args): ValidatedArgs {
    return {};
  }
}

export type ArgsOptions = {
  [argnames: string]: {
    type: "string" | "boolean";
    short?: string;
    default?: string;
    required?: boolean;
  };
};

export type ValidatedArgs = {
  [argnames: string]: boolean | string | undefined;
};
