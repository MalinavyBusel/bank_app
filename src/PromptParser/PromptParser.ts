export interface PromptParser {
  parse: (prompt: string) => CommandDescriptor;
}

export type CommandDescriptor = {
  command: string;
  subcommand: string;
  args: Args;
};

export type Args = {
  [argName: string]: string
}
