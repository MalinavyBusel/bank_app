import { Command } from "../command/Command.js";
import { CommandDescriptor } from "../promptparser/PromptParser.js";
import { BankCreate } from "../command/Bank/Create.js";
import { Exit } from "../command/ExitCommand.js";

export class CommandFactory {
  private readonly commandMap: Map<string, Map<string, Command>>;

  constructor() {
    const commandsList = [BankCreate, Exit];
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
      throw new InvalidCommandNameError("command type or name is invalid");
    }
    return command;
  }
}

class InvalidCommandNameError extends Error {}
