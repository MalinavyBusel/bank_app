import { Command } from "../../interfaces/Command";
import { validatedArgs } from "./Validator.js";

export class ErrorCommand implements Command {
    private message: string;
    
    constructor(message: string) {
        this.message = message;
    }

    public getType() {
        return "";
    }
     
    public getName() {
        return "";
    }

    public validateArgs(args: string[]): validatedArgs {
        return {};
    }

    public execute() {
        return this.message;
    }
}