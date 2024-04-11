import { CliCommandInterpreter } from "./cli.command-interpreter.js";
import { CommandInterpreter } from "./command-interpreter.js";
import { HttpCommandInterpreter } from "./http.command-interpreter.js";
import { CommandFactory } from "../commandfactory/command-factory.js";

export class CommandInterpreterCreator {
  public static new(factory: CommandFactory): CommandInterpreter {
    const commandInterpreterArgument = process.argv.at(3);
    switch (commandInterpreterArgument) {
      case "--cli":
        return new CliCommandInterpreter(factory);
      case "--http":
        return new HttpCommandInterpreter(factory);
      default:
        throw new Error(
          "No argument for selecting communication type was provided",
        );
    }
  }
}
