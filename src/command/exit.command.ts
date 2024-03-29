import { ArgOption, ArgValidator } from "../argvalidator/arg-validator.js";
import { Command, CommandStatus } from "./command.js";

export class Exit extends ArgValidator implements Command {
  protected readonly options: ArgOption[] = [];

  public getType() {
    return "exit";
  }

  public getName() {
    return "";
  }

  public execute() {
    return {
      statusCode: CommandStatus.Exit,
      body: "exit received, shutting down.",
    };
  }
}
