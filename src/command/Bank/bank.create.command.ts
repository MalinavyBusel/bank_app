import { Command, CommandStatus } from "../command.js";
import { ArgValidator, ArgOption } from "../../argvalidator/arg-validator.js";

export class BankCreate extends ArgValidator implements Command {
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string", required: true },
    { full: "entity", short: "e", type: "string", default: "1" },
    { full: "ind", short: "i", type: "string" },
  ];

  protected getOptions(): ArgOption[] {
    return this.options;
  }

  public getType() {
    return "bank";
  }

  public getName() {
    return "create";
  }

  public execute() {
    return { statusCode: CommandStatus.Ok, body: "bank create executed" };
  }
}
