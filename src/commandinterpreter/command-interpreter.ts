import { Communicator } from "../cli/communicator.js";
import { PromptParser } from "../promptparser/prompt-parser.js";
import {
  CommandFactory,
  InvalidCommandNameError,
} from "../commandfactory/command-factory.js";
import { CommandResult, CommandStatus } from "../command/command.js";
import { DatabaseManager } from "../db/manager.js";
import {
  ArgumentFormatError,
  IncompatibleArgsError,
} from "../promptparser/cli.prompt-parser.js";
import {
  IncorrectArgTypeError,
  MissingRequiredArgError,
  OverlappedNamesError,
  UnknownArgNameError,
} from "../argvalidator/arg-validator.js";

export class CommandInterpreter {
  private readonly communicator: Communicator;

  private readonly promptParser: PromptParser;

  private readonly commandFactory: CommandFactory;

  private readonly db: DatabaseManager;

  private running: boolean = false;

  constructor(
    communicator: Communicator,
    promptParser: PromptParser,
    db: DatabaseManager,
  ) {
    this.communicator = communicator;
    this.promptParser = promptParser;
    this.db = db;
    this.commandFactory = new CommandFactory(this.db.newProvider());
  }

  public async start() {
    await this.db.connect();
    this.running = true;

    while (this.running) {
      try {
        const prompt = await this.communicator.recieve();
        const commandDescriptor = this.promptParser.parse(prompt);
        const command = this.commandFactory.getCommand(commandDescriptor);
        const vArgs = command.validateArgs(commandDescriptor.args);
        const commandResult = await command.execute(vArgs);
        this.handleCommandResult(commandResult);
      } catch (error) {
        const message = this.handleError(error as Error);
        this.communicator.send<string>(message);
      }
    }
    await this.db.close();
  }

  private handleCommandResult<T>(commandResult: CommandResult<T>): void {
    switch (commandResult.statusCode) {
      case CommandStatus.Exit:
        this.communicator.send<T>(commandResult.body);
        this.running = false;
        break;
      case CommandStatus.Ok:
      case CommandStatus.Error:
        this.communicator.send<T>(commandResult.body);
    }
  }

  private handleError(error: Error): string {
    switch (error.constructor) {
      case ArgumentFormatError:
      case IncompatibleArgsError:
      case InvalidCommandNameError:
      case OverlappedNamesError:
      case MissingRequiredArgError:
      case IncorrectArgTypeError:
      case UnknownArgNameError:
        return error.message;
      default:
        return `Unknown error: ${error.message}`;
    }
  }
}
