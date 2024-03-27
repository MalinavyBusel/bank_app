import { Command } from "../../../interfaces/Command.js";
import { ArgParser, argsOptions } from "../ArgParser.js";

export class BankCreate extends ArgParser implements Command {
  protected options: argsOptions = {
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
