import {
  ArgOption,
  ArgValidator,
  ValidatedArgs,
} from "../argvalidator/arg-validator.js";
import { Command, CommandResult, CommandStatus } from "./command.js";

export class Exit extends ArgValidator implements Command {
  private readonly options: ArgOption[] = [];

  protected getOptions(): ArgOption[] {
    return this.options;
  }

  public getType(): string {
    return "exit";
  }

  public getName(): string {
    return "";
  }

  public execute(_args: ValidatedArgs): CommandResult<string> {
    return {
      statusCode: CommandStatus.Exit,
      body: "exit received, shutting down.",
    };
  }
}
