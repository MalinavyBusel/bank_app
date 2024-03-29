import { Communicator } from "../cli/Communicator.js";
import { PromptParser } from "../promptparser/PromptParser.js";
import { CommandFactory } from "../commandfactory/CommandFactory.js";
import { CommandResult, CommandStatus } from "../command/Command.js";
import { DatabaseConnector } from "../db/Connector.js";
import { ValidatedArgs } from "../argvalidator/ArgValidator.js";

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
    this.running = true;
    this.communicator = communicator;
    this.promptParser = promptParser;
    this.commandFactory = new CommandFactory();
    db.connect();
  }

  public async start() {
    while (this.running) {
      const prompt = await this.communicator.recieve();
      try {
        const commandDescriptor = this.promptParser.parse(prompt);
        const command = this.commandFactory.getCommand(commandDescriptor);
        this.communicator.send<ValidatedArgs>(
          command.validateArgs(commandDescriptor.args),
        );
        const commandResult = command.execute();
        this.handleCommandResult(commandResult);
      } catch (error) {
        const message = error instanceof Error ? error.message : "UnknownError";
        this.communicator.send<string>(message);
      }
    }
    this.communicator.close();
  }

  private handleCommandResult(commandResult: CommandResult): void {
    switch (commandResult.statusCode) {
      case CommandStatus.Exit:
        this.communicator.send<string>(commandResult.body);
        this.running = false;
        break;
      case CommandStatus.Ok:
        this.communicator.send<string>(commandResult.body);
        break;
      case CommandStatus.Error:
        this.communicator.send<string>(commandResult.body);
        break;
    }
  }
}
