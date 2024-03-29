import { Args } from "../promptparser/PromptParser.js";

export abstract class ArgValidator {
  protected readonly abstract options: ArgOption[];
  validateArgs(args: Args): ValidatedArgs {
    const vArgs: ValidatedArgs = {};
    const keys: string[] = [];
    for (const option of this.options) {
      if (option.full in args && option.short in args) {
        throw new OverlappedNamesError(
          `Both full name and short name provided for arg '${option.full}'`,
        );
      }
      let value = args[option.full] ?? args[option.short] ?? option.default;
      if (value === undefined) {
        if (option.required === true) {
          throw new MissingRequiredArgError(
            `Argument ${option.full} is required`,
          );
        }
        continue;
      }
      if (typeof value === "string" && option.type === "object") {
        value = [value];
      } else if (typeof value !== option.type) {
        throw new IncorrectArgTypeError(
          `Incorrect value for argument '${option.full}'`,
        );
      }
      keys.push(option.full, option.short);
      vArgs[option.full] = value;
    }
    const diff = Array.from(Object.keys(args)).filter((x) => !keys.includes(x));
    if (diff.length > 0) {
      throw new UnknownArgNameError(`Unknown argument names: ${diff}`);
    }
    return vArgs;
  }
}

export type ArgOption = {
  full: string;
  short: string;
  default?: string;
  required?: boolean;
  type: "boolean" | "string" | "object";
};

export type ValidatedArgs = {
  [argnames: string]: boolean | string | string[];
};

class OverlappedNamesError extends Error {}
class MissingRequiredArgError extends Error {}
class IncorrectArgTypeError extends Error {}
class UnknownArgNameError extends Error {}
