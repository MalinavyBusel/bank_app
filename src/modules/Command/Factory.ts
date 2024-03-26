import { Command } from "../../interfaces/Command";
import { commandDescriptor } from "../../interfaces/PromptParser";
import { ErrorCommand } from "./ErrorCommand.js";

export class Factory {
  private commandMap: Map<string, Map<string, Command>>;

  constructor(...commands: Command[]) {
    this.commandMap = new Map();
    for (const command of commands) {
      const type = command.getType();
      if (!this.commandMap.get(type)) {
        this.commandMap.set(type, new Map());
      }
      this.commandMap.get(type)!.set(command.getName(), command);
    }
  }

  public getCommand(commandDescriptor: commandDescriptor): Command {
    const command = this.commandMap
      .get(commandDescriptor.command)
      ?.get(commandDescriptor.subcommand);
    if (!command) {
      return new ErrorCommand("command type or name is invalid");
    }
    return command;
  }
}
