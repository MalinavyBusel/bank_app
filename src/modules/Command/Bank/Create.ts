import { Command } from "../../../interfaces/Command";
import { Validator, argsOptions } from "../Validator.js";

export class BankCreate extends Validator implements Command {
    protected options: argsOptions = {
        name: {
          type: "string",
          short: "n",
        },
        entity: {
          type: "string",
          short: "e",
          default: "0"
        },
        ind: {
            type: "string",
            short: "i",
            default: "0"
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