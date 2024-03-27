export interface PromptParser {
  parse: (prompt: string) => CommandDescriptor;
}

export type CommandDescriptor = {
  command: string;
  subcommand: string;
  args: string[];
};
