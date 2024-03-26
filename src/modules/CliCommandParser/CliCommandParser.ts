import { commandDescriptor } from "../../interfaces/PromptParser";

export class CliCommandParser {
  public parse(prompt: string): commandDescriptor {
    const pieces = prompt.split(" ");
    if (pieces.length < 3) {
      return { command: pieces[0], subcommand: "", args: [] };
    }
    return { command: pieces[0], subcommand: pieces[1], args: pieces.slice(2) };
  }
}
