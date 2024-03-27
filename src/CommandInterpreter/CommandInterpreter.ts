import { Speaker } from "../CLI/Speaker.js";
import { PromptParser } from "../CommandParser/PromptParser.js";
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
    let prompt = await this.speaker.recieve();
    while (prompt != "exit") {
      const commandDescriptor = this.promptParser.parse(prompt);
      const command = this.commandFactory.getCommand(commandDescriptor);
      this.speaker.send(command.validateArgs(commandDescriptor.args));
      this.speaker.send(command.execute());
      prompt = await this.speaker.recieve();
    }
  }
}
