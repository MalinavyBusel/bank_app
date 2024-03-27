import { Command } from "../Command/Command.js";
import { CommandDescriptor } from "../CommandParser/PromptParser.js";
import { ErrorCommand } from "../Command/ErrorCommand.js";
import { BankCreate } from "../Command/Bank/Create.js";

export class CommandFactory {
  private readonly commandMap: Map<string, Map<string, Command>>;

  constructor() {
    const commandsList = [BankCreate];
    this.commandMap = new Map();
    for (const commandClass of commandsList) {
      const command = new commandClass();
      const type = command.getType();
      if (!this.commandMap.get(type)) {
        this.commandMap.set(type, new Map());
      }
      this.commandMap.get(type)!.set(command.getName(), command);
    }
  }

  public getCommand(commandDescriptor: CommandDescriptor): Command {
    const command = this.commandMap
      .get(commandDescriptor.command)
      ?.get(commandDescriptor.subcommand);
    if (!command) {
      return new ErrorCommand("command type or name is invalid");
    }
    return command;
  }
}
