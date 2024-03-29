import { Communicator } from "../cli/Communicator.js";
import { PromptParser } from "../promptparser/PromptParser.js";
import { CommandFactory } from "../commandfactory/CommandFactory.js";
import { CommandStatus } from "../command/Command.js";
import { DatabaseConnector } from "../db/Connector.js";
import { ValidatedArgs } from "../argvalidator/ArgValidator.js";

export class CommandInterpreter {
  private readonly communicator: Communicator;
  private readonly promptParser: PromptParser;
  private readonly commandFactory: CommandFactory;

  constructor(
    communicator: Communicator,
    promptParser: PromptParser,
    db: DatabaseConnector,
  ) {
    this.communicator = communicator;
    this.promptParser = promptParser;
    this.commandFactory = new CommandFactory();
    db.connect();
  }

  public async start() {
    let running = true;
    while (running) {
      const prompt = await this.communicator.recieve();
      try {
        const commandDescriptor = this.promptParser.parse(prompt);
        const command = this.commandFactory.getCommand(commandDescriptor);
        this.communicator.send<ValidatedArgs>(
          command.validateArgs(commandDescriptor.args),
        );
        const commandResult = command.execute();
        switch (commandResult.statusCode) {
          case CommandStatus.Ok:
            this.communicator.send<string>(commandResult.body);
            break;
          case CommandStatus.Error:
            //
            break;
          case CommandStatus.Exit:
            this.communicator.send<string>(commandResult.body);
            running = false;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "UnknownError";
        this.communicator.send<string>(message);
      }
    }
    this.communicator.close();
  }
}
