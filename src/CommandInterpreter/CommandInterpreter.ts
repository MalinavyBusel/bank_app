import { Speaker } from "../CLI/Speaker.js";
import {
  CommandDescriptor,
  PromptParser,
} from "../PromptParser/PromptParser.js";
import { CommandFactory } from "../CommandFactory/CommandFactory.js";

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
      try {
        commandDescriptor = this.promptParser.parse(prompt);
      } catch (error) {
        const message = error instanceof Error ? error.message : "UnknownError";
        this.speaker.send(message);
        continue;
      }
      const command = this.commandFactory.getCommand(commandDescriptor);
      this.speaker.send(command.validateArgs(commandDescriptor.args));
      this.speaker.send(command.execute());
    }
  }
}
