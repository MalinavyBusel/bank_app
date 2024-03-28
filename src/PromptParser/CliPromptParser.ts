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
    if (!args[0].startsWith("-")) throw new ArgumentFormatError(`Invalid format of argument: ${args[0]}`);
    args[0] = args[0].slice(1);
    
    const argumentsObj: Args = {};
    for (let argument of args) {
      if (!RegExp(/^(\w|(-\w{2,}))(\s\w+)?$/).test(argument)) {
        throw new ArgumentFormatError(
          `Invalid format of argument: ${"-" + argument}`,
        );
      }
      if (argument.startsWith("-")) {
        argument = argument.slice(1);
      }

      let [key, val] = argument.split(" ");

      if (!(key in argumentsObj)) {
        argumentsObj[key] = val ? val : true;
      } else if (typeof argumentsObj[key] === 'boolean' || val === undefined) {
        throw new IncompatibleArgsError("You can use multiple value args only in '-k v' format")
      } else {
        argumentsObj[key] = [...argumentsObj[key] as string[], val];
      }
    }
    return argumentsObj;
  }
}

export class ArgumentFormatError extends Error {}
export class IncompatibleArgsError extends Error {}
