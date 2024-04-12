import { Command } from "../command/command.js";
import { CommandDescriptor } from "../promptparser/prompt-parser.js";
import { BankCreate } from "../command/bank/bank.create.command.js";
import { Exit } from "../command/exit.command.js";
import { RepoFactory } from "../storage/factory/factory.js";
import { BankGet } from "../command/bank/bank.get.command.js";
import { BankDelete } from "../command/bank/bank.delete.command.js";
import { BankUpdate } from "../command/bank/bank.update.command.js";
import { ClientCreate } from "../command/client/client.create.command.js";
import { ClientGet } from "../command/client/client.get.command.js";
import { ClientDelete } from "../command/client/client.delete.command.js";
import { BankFind } from "../command/bank/bank.find.command.js";
import { ClientFind } from "../command/client/client.find.command.js";
import { AccountCreate } from "../command/account/account.create.command.js";
import { AccountGet } from "../command/account/account.get.command.js";
import { AccountDelete } from "../command/account/account.delete.command.js";
import { AccountFind } from "../command/account/account.find.command.js";
import { TransactionCreate } from "../command/transaction/transaction.create.command.js";
import { TransactionGet } from "../command/transaction/transaction.get.command.js";
import { ClientAccounts } from "../command/client/client.accounts.command.js";

export class CommandFactory {
  private readonly commandMap: Map<
    string,
    Map<string, Command<unknown, unknown>>
  >;

  constructor(repoFactory: RepoFactory) {
    const commandsList = this.getCommandsRegistry(repoFactory);
    this.commandMap = new Map();
    this.mapCommands(commandsList);
  }

  private getCommandsRegistry(
    repoFactory: RepoFactory,
  ): Command<unknown, unknown>[] {
    return [
      new Exit(),
      new BankCreate(repoFactory.getBankRepo()),
      new BankGet(repoFactory.getBankRepo()),
      new BankDelete(repoFactory.getBankRepo(), repoFactory.getAccountRepo()),
      new BankUpdate(repoFactory.getBankRepo()),
      new BankFind(repoFactory.getBankRepo()),
      new ClientCreate(
        repoFactory.getClientRepo(),
        repoFactory.getAccountRepo(),
      ),
      new ClientGet(repoFactory.getClientRepo()),
      new ClientDelete(
        repoFactory.getClientRepo(),
        repoFactory.getAccountRepo(),
      ),
      new ClientFind(repoFactory.getClientRepo()),
      new ClientAccounts(repoFactory.getAccountRepo()),
      new AccountCreate(repoFactory.getAccountRepo()),
      new AccountGet(repoFactory.getAccountRepo()),
      new AccountDelete(repoFactory.getAccountRepo()),
      new AccountFind(repoFactory.getAccountRepo()),
      new TransactionCreate(
        repoFactory.getTransactionRepo(),
        repoFactory.getBankRepo(),
        repoFactory.getAccountRepo(),
        repoFactory.getClientRepo(),
      ),
      new TransactionGet(repoFactory.getTransactionRepo()),
    ];
  }

  private mapCommands(commandsList: Command<unknown, unknown>[]) {
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
