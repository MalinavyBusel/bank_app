import { CliHandler } from "./CLI/CliHandler.js";
import { CliPromptParser } from "./PromptParser/CliPromptParser.js";
import { CommandFactory } from "./CommandFactory/CommandFactory.js";
import { CommandInterpreter } from "./CommandInterpreter/CommandInterpreter.js";
import { Mongo } from "./DB/Mongo.js";

function main() {
  const cli = new CliHandler();
  const commandParser = new CliPromptParser();
  const factory = new CommandFactory();
  const db = new Mongo()
  const interpreter = new CommandInterpreter(cli, commandParser, factory, db);
  interpreter.start();
}

main();
