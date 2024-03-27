import { Command } from "../Command.js";
import { ArgValidator, ArgsOptions } from "../../ArgValidator/ArgValidator.js";

export class BankCreate extends ArgValidator implements Command {
  protected options: ArgsOptions = {
    name: {
      type: "string",
      short: "n",
      required: true,
    },
    entity: {
      type: "string",
      short: "e",
      default: "0",
    },
    ind: {
      type: "string",
      short: "i",
      default: "0",
    },
  };

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
