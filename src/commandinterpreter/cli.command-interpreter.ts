import { CommandFactory } from "../commandfactory/command-factory.js";
import { CommandResult, CommandStatus } from "../command/command.js";
import { CliPromptParser } from "../promptparser/cli.prompt-parser.js";
import { CommandInterpreter } from "./command-interpreter.js";
import { CliCommunicator } from "../cli/cli.communicator.js";

export class CliCommandInterpreter extends CommandInterpreter<string> {
  protected readonly communicator: CliCommunicator;

  protected readonly promptParser: CliPromptParser;

  protected readonly commandFactory: CommandFactory;

  private running: boolean = false;

  constructor(commandFactory: CommandFactory) {
    super();
    this.communicator = new CliCommunicator();
    this.promptParser = new CliPromptParser();
    this.commandFactory = commandFactory;
  }

  public async start() {
    this.running = true;

    while (this.running) {
      try {
        const prompt = await this.communicator.receive();
        const commandResult = await this.runCommand(prompt);
        this.handleCommandResult(commandResult);
      } catch (error) {
        const result = this.handleError(error as Error);
        this.communicator.send<string>(result);
      }
    }
    process.exit(0);
  }

  protected handleCommandResult<T>(commandResult: CommandResult<T>): void {
    switch (commandResult.statusCode) {
      case CommandStatus.Exit:
        this.communicator.send<T>(commandResult);
        this.running = false;
        break;
      case CommandStatus.Ok:
      case CommandStatus.Error:
        this.communicator.send<T>(commandResult);
    }
  }
}
