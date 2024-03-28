import { PromptParser, CommandDescriptor } from "./PromptParser.js";
import { Args } from "./PromptParser.js";

export class CliPromptParser implements PromptParser {
  public parse(prompt: string): CommandDescriptor {
    const pieces = prompt.split(" ");
    if (pieces.length < 3) {
      return { command: pieces[0], subcommand: "", args: {} };
    }
    return {
      command: pieces[0],
      subcommand: pieces[1],
      args: this.parseArgs(pieces.slice(2)),
    };
  }

  private parseArgs(args: string[]): Args {
    args = args.join(" ").split(" -");
    const argumentsObj: Args = {};
    for (let argument of args) {
      if (!RegExp(/^(\w|(-\w+))(\s\w+)?$/).test(argument)) {
        throw new ArgumentFormatError(
          `Invalid format of argument: ${"-" + argument}`,
        );
      }
      if (argument.startsWith("-")) {
        argument = argument.slice(1);
      }

      let [key, val] = argument.split(" ");
      val = val ? val : "true";

      if (key in argumentsObj) {
        argumentsObj[key] = [...argumentsObj[key], val];
      } else {
        argumentsObj[key] = val;
      }
    }
    return argumentsObj;
  }
}

export class ArgumentFormatError extends Error {}
