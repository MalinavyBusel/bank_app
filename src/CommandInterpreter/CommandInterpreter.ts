import { Speaker } from "../CLI/Speaker.js";
import {
  CommandDescriptor,
  PromptParser,
} from "../PromptParser/PromptParser.js";
import { CommandFactory } from "../CommandFactory/CommandFactory.js";
import { Command, CommandStatus } from "../Command/Command.js";

export class CommandInterpreter {
  private readonly speaker: Speaker;
  private readonly promptParser: PromptParser;
  private readonly commandFactory: CommandFactory;

  constructor(
    speaker: Speaker,
    promptParser: PromptParser,
    commandFactory: CommandFactory,
  ) {
    this.speaker = speaker;
    this.promptParser = promptParser;
    this.commandFactory = commandFactory;
  }

  public async start() {
    while (true) {
      const prompt = await this.speaker.recieve();
      let commandDescriptor: CommandDescriptor;
      let command: Command;
      try {
        commandDescriptor = this.promptParser.parse(prompt);
        command = this.commandFactory.getCommand(commandDescriptor);
        this.speaker.send(command.validateArgs(commandDescriptor.args));
      } catch (error) {
        const message = error instanceof Error ? error.message : "UnknownError";
        this.speaker.send(message);
        continue;
      }
      const commandResult = command.execute();
      switch (commandResult.statusCode) {
        case CommandStatus.Ok:
          this.speaker.send(commandResult.body);
          break;
        case CommandStatus.Error:
          //
          break;
        case CommandStatus.Exit:
          this.speaker.send(commandResult.body);
          process.exit(0);
      }
    }
  }
}
