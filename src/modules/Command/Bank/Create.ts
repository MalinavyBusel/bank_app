import { Command } from "../../../interfaces/Command";

export class BankCreate implements Command {
    private options = {
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

    public validateArgs() {

    }

    public execute() {
        return "bank create executed";
    }
}