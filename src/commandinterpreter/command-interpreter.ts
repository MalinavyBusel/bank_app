import { Communicator } from "../cli/communicator.js";
import { PromptParser } from "../promptparser/prompt-parser.js";
import {
  CommandCreationError,
  CommandFactory,
} from "../commandfactory/command-factory.js";
import { CommandResult, CommandStatus } from "../command/command.js";
import { ArgumentParsingError } from "../promptparser/cli.prompt-parser.js";
import { ArgValidationError } from "../argvalidator/arg-validator.js";

export abstract class CommandInterpreter {
  protected abstract readonly communicator: Communicator;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract readonly promptParser: PromptParser<any>;

  protected abstract readonly commandFactory: CommandFactory;

  protected constructor() {}

  public abstract start(): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async runCommand(prompt: any): Promise<CommandResult<unknown>> {
    const commandDescriptor = await this.promptParser.parse(prompt);
    const command = this.commandFactory.getCommand(commandDescriptor);
    const vArgs = command.validateArgs(commandDescriptor.args);
    const commandResult = await command.execute(vArgs);
    return commandResult;
  }

  protected abstract handleCommandResult<T>(
    commandResult: CommandResult<T>,
  ): void;

  protected handleError(error: Error): CommandResult<string> {
    switch (error.constructor) {
      case ArgumentParsingError:
      case CommandCreationError:
      case ArgValidationError:
        return { statusCode: CommandStatus.Error, body: error.message };
      default:
        return {
          statusCode: CommandStatus.InnerError,
          body: `Unknown error: ${error.message}`,
        };
    }
  }
}
