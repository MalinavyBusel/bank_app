import { Communicator } from "../cli/communicator.js";
import { PromptParser } from "../promptparser/prompt-parser.js";
import { CommandFactory } from "../commandfactory/command-factory.js";
import { CommandResult, CommandStatus } from "../command/command.js";
import { DatabaseConnector } from "../db/connector.js";

export class CommandInterpreter {
  private readonly communicator: Communicator;
  private readonly promptParser: PromptParser;
  private readonly commandFactory: CommandFactory;
  private running: boolean;

  constructor(
    communicator: Communicator,
    promptParser: PromptParser,
    db: DatabaseConnector,
  ) {
    this.communicator = communicator;
    this.promptParser = promptParser;
    this.commandFactory = new CommandFactory();
    db.connect();

    this.running = true;
  }

  public async start() {
    while (this.running) {
      try {
        const prompt = await this.communicator.recieve();
        const commandDescriptor = this.promptParser.parse(prompt);
        const command = this.commandFactory.getCommand(commandDescriptor);
        const vArgs = command.validateArgs(commandDescriptor.args);
        const commandResult = command.execute(vArgs);
        this.handleCommandResult(commandResult);
      } catch (error) {
        const message = error instanceof Error ? error.message : "UnknownError";
        this.communicator.send<string>(message);
      }
    }
  }

  private handleCommandResult(commandResult: CommandResult): void {
    switch (commandResult.statusCode) {
      case CommandStatus.Exit:
        this.communicator.send<string>(commandResult.body);
        this.running = false;
        break;
      case CommandStatus.Ok:
      case CommandStatus.Error:
        this.communicator.send<string>(commandResult.body);
    }
  }
}
