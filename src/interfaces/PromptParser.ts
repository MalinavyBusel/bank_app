export interface PromptParser {
    parse: (prompt: string) => commandDescriptor
}

export type commandDescriptor = {
    command: string
    subcommand: string
    args: string[]
}