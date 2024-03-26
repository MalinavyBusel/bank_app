import { parseArgs } from "node:util";

export abstract class Validator {
    protected abstract options: argsOptions
    validateArgs(args: string[]): validatedArgs {
        return parseArgs({ args, options: this.options }).values as validatedArgs;
    }
}

export type argsOptions = {[argnames: string]: {type: "string" | "boolean", short: string, default?: string}}

export type validatedArgs = {
    [argnames: string]: boolean | string | undefined
}
