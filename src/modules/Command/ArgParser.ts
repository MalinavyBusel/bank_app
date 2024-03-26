import { parseArgs } from "node:util";

export abstract class ArgParser {
  protected abstract options: argsOptions;
  parseArgs(args: string[]): validatedArgs {
    const argsParsed = parseArgs({ args, options: this.options })
      .values as validatedArgs;

    for (const field of Object.entries(this.options)) {
      if (!(field[0] in argsParsed)) {
        argsParsed[field[0]] = undefined;
      }
    }
    return argsParsed;
  }
}

export type argsOptions = {
  [argnames: string]: {
    type: "string" | "boolean";
    short?: string;
    default?: string;
    required?: boolean;
  };
};

export type validatedArgs = {
  [argnames: string]: boolean | string | undefined;
};
