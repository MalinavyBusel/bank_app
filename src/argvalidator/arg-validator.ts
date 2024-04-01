import { Args, Argument } from "../promptparser/prompt-parser.js";

export abstract class ArgValidator {
  protected abstract getOptions(): ArgOption[];

  validateArgs(args: Args): ValidatedArgs {
    const vArgs: ValidatedArgs = {};
    const encounteredKeys: string[] = [];

    for (const option of this.getOptions()) {
      this.checkBothNamesExist(args, option.full, option.short);

      let value = args[option.full] ?? args[option.short] ?? option.default;
      value = this.checkMissingArgument(value, option);
      value = this.checkIncorrectType(value, option);
      value = this.customOptionHook(value, option);

      encounteredKeys.push(option.full, option.short);
      vArgs[option.full] = value;
    }
    this.checkUnknownArgs(args, encounteredKeys);
    return vArgs;
  }

  protected checkUnknownArgs(args: Args, keys: string[]): void {
    const diff = Array.from(Object.keys(args)).filter((x) => !keys.includes(x));
    if (diff.length > 0) {
      throw new UnknownArgNameError(`Unknown argument names: ${diff}`);
    }
  }

  protected customOptionHook(value: Argument, _option?: ArgOption): Argument {
    return value;
  }

  protected checkBothNamesExist(args: Args, full: string, short: string): void {
    if (full in args && short in args) {
      throw new OverlappedNamesError(
        `Both full name and short name provided for arg '${full}'`,
      );
    }
  }

  protected checkMissingArgument(
    value: Argument | undefined,
    option: ArgOption,
  ): Argument {
    if (value === undefined) {
      if (option.required === true) {
        throw new MissingRequiredArgError(
          `Argument ${option.full} is required`,
        );
      }
      switch (option.type) {
        case "boolean":
          return false;
        case "object":
          return [];
        case "string":
          return "";
      }
    } else {
      return value;
    }
  }

  protected checkIncorrectType(value: Argument, option: ArgOption): Argument {
    if (typeof value === "string" && option.type === "object") {
      value = [value];
    } else if (typeof value !== option.type) {
      throw new IncorrectArgTypeError(
        `Incorrect value for argument '${option.full}'`,
      );
    }
    return value;
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
  [names: string]: Argument;
};

class OverlappedNamesError extends Error {}
class MissingRequiredArgError extends Error {}
class IncorrectArgTypeError extends Error {}
class UnknownArgNameError extends Error {}
