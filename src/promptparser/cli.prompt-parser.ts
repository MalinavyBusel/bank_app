import { PromptParser, CommandDescriptor } from "./prompt-parser.js";
import { Args } from "./prompt-parser.js";

export class CliPromptParser implements PromptParser {
  public parse(prompt: string): CommandDescriptor {
    const pieces = prompt.split(" ");
    if (pieces.length < 3) {
      return {
        command: pieces[0],
        subCommand: pieces.at(1) ? pieces[1] : "",
        args: {},
      };
    }
    return {
      command: pieces[0],
      subCommand: pieces[1],
      args: this.parseArgs(pieces.slice(2)),
    };
  }

  private parseArgs(args: string[]): Args {
    args = args.join(" ").split(" -");
    if (!args[0].startsWith("-"))
      throw new ArgumentFormatError(
        `Invalid format of argument: '${args[0] ? args[0] : "empty args"}'`,
      );
    args[0] = args[0].slice(1);

    const argumentsObj: Args = {};
    for (let argument of args) {
      if (!RegExp(/^(\w|(-\w{2,}))(\s\w+)?$/).test(argument.trim())) {
        throw new ArgumentFormatError(
          `Invalid format of argument: '${"-" + argument}'`,
        );
      }
      if (argument.startsWith("-")) {
        argument = argument.slice(1);
      }

      const [key, val] = argument.split(" ");

      if (!(key in argumentsObj)) {
        argumentsObj[key] = val ? val : true;
      } else if (typeof argumentsObj[key] === "boolean" || val === undefined) {
        throw new IncompatibleArgsError(
          "You can use multiple value args only in '-k v' format",
        );
      } else {
        argumentsObj[key] = [...(argumentsObj[key] as string[]), val];
      }
    }
    return argumentsObj;
  }
}

export class ArgumentFormatError extends Error {}
export class IncompatibleArgsError extends Error {}
