import { PromptParser, CommandDescriptor } from "./PromptParser.js";
import { Args } from "./PromptParser.js"

export class CliPromptParser implements PromptParser {
  public parse(prompt: string): CommandDescriptor {
    const pieces = prompt.split(" ");
    console.log(pieces.slice(2).join(" ").split(" -"))
    if (pieces.length < 3) {
      return { command: pieces[0], subcommand: "", args: {} };
    }
    return { command: pieces[0], subcommand: pieces[1], args: this.parseArgs(pieces.slice(2)) };
  }

  private parseArgs(args: string[]): Args {
    args = args.join(" ").split(" -");
    let argumentsObj: Args = {}
    for (let argument of args) {
      if (argument.startsWith("-")) {
        argument = argument.slice(1);
      }

      if (argument.includes(" ")) {
        let [key, val] = argument.split(" ");
        argumentsObj[key] = val;
      } else {
        argumentsObj[argument] = "true";
      }
    }
    return argumentsObj
  }
}
