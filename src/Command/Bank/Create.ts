import { Command } from "../Command.js";
import { ArgValidator, ArgOption } from "../../ArgValidator/ArgValidator.js";

export class BankCreate extends ArgValidator implements Command {
  protected options: ArgOption[] = [
    { full: "name", short: "n", type: "string", required: true },
    { full: "entity", short: "e", type: "string", default: "1" },
    { full: "ind", short: "i", type: "string" },
  ];

  public getType() {
    return "bank";
  }

  public getName() {
    return "create";
  }

  public execute() {
    return "bank create executed";
  }
}
