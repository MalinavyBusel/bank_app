import { Command } from "../command/command.js";
import { CommandDescriptor } from "../promptparser/prompt-parser.js";
import { BankCreate } from "../command/bank/bank.create.command.js";
import { Exit } from "../command/exit.command.js";
import { RepoFactory } from "../storage/factory/factory.js";
import { BankGet } from "../command/bank/bank.get.command.js";

export class CommandFactory {
  private readonly commandMap: Map<
    string,
    Map<string, Command<unknown, unknown>>
  >;

  constructor(repoFactory: RepoFactory) {
    const commandsList = [
      new BankCreate(repoFactory.getBankRepo()),
      new Exit(),
      new BankGet(repoFactory.getBankRepo()),
    ];
    this.commandMap = new Map();
    for (const command of commandsList) {
      const type = command.getType();
      if (!this.commandMap.get(type)) {
        this.commandMap.set(type, new Map());
      }
      this.commandMap.get(type)!.set(command.getName(), command);
    }
  }

  public getCommand(
    commandDescriptor: CommandDescriptor,
  ): Command<unknown, unknown> {
    const command = this.commandMap
      .get(commandDescriptor.command)
      ?.get(commandDescriptor.subCommand);
    if (!command) {
      throw new CommandCreationError(
        `command type or name is invalid: '${commandDescriptor.command + " " + commandDescriptor.subCommand}'`,
      );
    }
    return command;
  }
}

export class CommandCreationError extends Error {}
