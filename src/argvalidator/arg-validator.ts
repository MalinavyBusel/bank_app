import { Args, Argument } from "../promptparser/prompt-parser.js";

export class ArgValidator {
  public validateArgs(args: Args, options: ArgOption[]): ValidatedArgs {
    const vArgs: ValidatedArgs = {};
    const encounteredKeys: string[] = [];

    for (const option of options) {
      const val = this.validateOption(args, option);
      if (val != undefined) {
        vArgs[option.full] = val;
      }
      encounteredKeys.push(option.full, option.short ?? "");
    }
    this.checkUnknownArgs(args, encounteredKeys);
    return vArgs;
  }

  private validateOption(args: Args, option: ArgOption): Argument | undefined {
    this.checkBothNamesExist(args, option.full, option.short ?? "");

    let value: Argument | undefined =
      args[option.full] ?? args[option.short ?? ""] ?? option.default;
    value = this.checkMissingArgument(value, option);
    if (value == undefined) {
      return value;
    }
    value = this.checkIncorrectType(value, option);
    value = this.customOptionHook(value, option);
    return value;
  }

  protected checkUnknownArgs(args: Args, keys: string[]): void {
    const diff = Array.from(Object.keys(args)).filter((x) => !keys.includes(x));
    if (diff.length > 0) {
      throw new ArgValidationError(`Unknown argument names: '${diff}'`);
    }
  }

  protected customOptionHook(value: Argument, _option?: ArgOption): Argument {
    return value;
  }

  protected checkBothNamesExist(args: Args, full: string, short: string): void {
    if (full in args && short in args) {
      throw new ArgValidationError(
        `Both full name and short name provided for arg '${full}'`,
      );
    }
  }

  protected checkMissingArgument(
    value: Argument | undefined,
    option: ArgOption,
  ): Argument | undefined {
    if (value === undefined) {
      if (option.required === true) {
        throw new ArgValidationError(`Argument '${option.full}' is required`);
      }
      switch (option.type) {
        case "object":
          return [];
        default:
          return undefined;
      }
    } else {
      return value;
    }
  }

  protected checkIncorrectType(value: Argument, option: ArgOption): Argument {
    if (typeof value === "string" && option.type === "object") {
      value = [value];
    } else if (option.type == "enum" && typeof value === "string") {
      if (!option.values!.includes(value.trim()) && value != "") {
        throw new ArgValidationError(
          `Incorrect value for argument '${option.full}'`,
        );
      }
    } else if (typeof value !== option.type) {
      throw new ArgValidationError(
        `Incorrect value for argument '${option.full}'`,
      );
    }
    return value;
  }
}

export type ArgOption = {
  full: string;
  short?: string;
  default?: string;
  required?: boolean;
  type: "boolean" | "string" | "object" | "enum";
  values?: string[];
};

export type ValidatedArgs = {
  [names: string]: Argument;
};

export class ArgValidationError extends Error {}
