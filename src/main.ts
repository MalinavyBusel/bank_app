import { CliHandler } from "./CLI/CliHandler.js";
import { CliPromptParser } from "./CommandParser/CliCommandParser.js";
import { CommandFactory } from "./CommandFactory/CommandFactory.js";
import { CommandInterpreter } from "./CommandInterpreter/CommandInterpreter.js";

function main() {
  const cli = new CliHandler();
  const commandParser = new CliPromptParser();
  const factory = new CommandFactory();
  const interpreter = new CommandInterpreter(cli, commandParser, factory);
  interpreter.start();
}

main();
