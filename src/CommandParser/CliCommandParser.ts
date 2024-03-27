import { PromptParser, CommandDescriptor } from "./PromptParser.js";

export class CliPromptParser implements PromptParser {
  public parse(prompt: string): CommandDescriptor {
    const pieces = prompt.split(" ");
    if (pieces.length < 3) {
      return { command: pieces[0], subcommand: "", args: [] };
    }
    return { command: pieces[0], subcommand: pieces[1], args: pieces.slice(2) };
  }
}
