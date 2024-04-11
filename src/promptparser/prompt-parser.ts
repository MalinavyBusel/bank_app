export interface PromptParser<T> {
  parse: (prompt: T) => Promise<CommandDescriptor>;
}

export type CommandDescriptor = {
  command: string;
  subCommand: string;
  args: Args;
};

export type Args = {
  [names: string]: Argument;
};
export type Argument = boolean | string | string[];
