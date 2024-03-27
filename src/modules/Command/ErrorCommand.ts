import { Command } from "../../interfaces/Command.js";
import { validatedArgs } from "./ArgParser.js";

export class ErrorCommand implements Command {
  private message: string;

  constructor(message: string) {
    this.message = message;
  }

  public getType() {
    return "";
  }

  public getName() {
    return "";
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public parseArgs(args: string[]): validatedArgs {
    return {};
  }

  public execute() {
    return this.message;
  }
}
