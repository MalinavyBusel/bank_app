import { validatedArgs } from "../modules/Command/Validator.js";

export interface Command {
    getType: () => string
    getName: () => string
    validateArgs: (args: string[]) => validatedArgs
    execute: () => string
}