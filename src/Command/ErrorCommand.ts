import { Command } from "./Command.js";
import { ValidatedArgs } from "../ArgValidator/ArgValidator.js";
import { Args } from "../PromptParser/PromptParser.js";

export class ErrorCommand implements Command {
  private readonly message: string;

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
  public validateArgs(args: Args): ValidatedArgs {
    return {};
  }

  public execute() {
    return this.message;
  }
}
