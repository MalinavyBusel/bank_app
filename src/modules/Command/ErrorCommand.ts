import { Command } from "../../interfaces/Command";

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

    public validateArgs() {

    }

    public execute() {
        return this.message;
    }
}