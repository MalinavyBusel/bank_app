import { parseArgs } from "node:util";

export abstract class ArgValidator {
  protected abstract options: ArgsOptions;
  validateArgs(args: string[]): ValidatedArgs {
    const argsParsed = parseArgs({ args, options: this.options })
      .values as ValidatedArgs;

    for (const field of Object.entries(this.options)) {
      if (!(field[0] in argsParsed)) {
        argsParsed[field[0]] = undefined;
      }
    }
    return argsParsed;
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
