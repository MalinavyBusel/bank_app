import { Command } from "./Command.js";
import { ValidatedArgs } from "../ArgValidator/ArgValidator.js";

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
  public validateArgs(args: string[]): ValidatedArgs {
    return {};
  }

  public execute() {
    return this.message;
  }
}
