import { CliHandler } from "./cli/CliHandler.js";
import { CliPromptParser } from "./promptparser/CliPromptParser.js";
import { CommandFactory } from "./commandfactory/CommandFactory.js";
import { CommandInterpreter } from "./commandinterpreter/CommandInterpreter.js";
import { Mongo } from "./db/Mongo.js";

function main() {
  const cli = new CliHandler();
  const commandParser = new CliPromptParser();
  const factory = new CommandFactory();
  const db = new Mongo()
  const interpreter = new CommandInterpreter(cli, commandParser, factory, db);
  interpreter.start();
}

main();
