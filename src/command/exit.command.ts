import {
  ArgOption,
  ArgValidator,
  ValidatedArgs,
} from "../argvalidator/arg-validator.js";
import { Command, CommandStatus } from "./command.js";

export class Exit extends ArgValidator implements Command {
  private readonly options: ArgOption[] = [];

  protected getOptions(): ArgOption[] {
    return this.options;
  }

  public getType() {
    return "exit";
  }

  public getName() {
    return "";
  }

  public execute(_args: ValidatedArgs) {
    return {
      statusCode: CommandStatus.Exit,
      body: "exit received, shutting down.",
    };
  }
}