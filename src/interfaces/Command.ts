export interface Command {
    getType: () => string
    getName: () => string
    validateArgs: () => void
    execute: () => string
}