import { Communicator } from "../cli/Communicator.js";
import {
  CommandDescriptor,
  PromptParser,
} from "../promptparser/PromptParser.js";
import { CommandFactory } from "../commandfactory/CommandFactory.js";
import { Command, CommandStatus } from "../command/Command.js";
import { DatabaseConnector } from "../db/Connector.js";

export class CommandInterpreter {
  private readonly communicator: Communicator;
  private readonly promptParser: PromptParser;
  private readonly commandFactory: CommandFactory;

  constructor(
    communicator: Communicator,
    promptParser: PromptParser,
    commandFactory: CommandFactory,
    db: DatabaseConnector
  ) {
    this.communicator = communicator;
    this.promptParser = promptParser;
    this.commandFactory = commandFactory;
    db.connect();
  }

  public async start() {
    while (true) {
      const prompt = await this.communicator.recieve();
      let commandDescriptor: CommandDescriptor;
      let command: Command;
      try {
        commandDescriptor = this.promptParser.parse(prompt);
        command = this.commandFactory.getCommand(commandDescriptor);
        this.communicator.send(command.validateArgs(commandDescriptor.args));
      } catch (error) {
        const message = error instanceof Error ? error.message : "UnknownError";
        this.communicator.send(message);
        continue;
      }
      const commandResult = command.execute();
      switch (commandResult.statusCode) {
        case CommandStatus.Ok:
          this.communicator.send(commandResult.body);
          break;
        case CommandStatus.Error:
          //
          break;
        case CommandStatus.Exit:
          this.communicator.send(commandResult.body);
          process.exit(0);
      }
    }
  }
}
