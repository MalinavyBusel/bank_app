import { CliHandler } from "./cli/CliHandler.js";
import { CliPromptParser } from "./promptparser/CliPromptParser.js";
import { CommandInterpreter } from "./commandinterpreter/CommandInterpreter.js";
import { Mongo } from "./db/Mongo.js";

function main() {
  const cli = new CliHandler();
  const commandParser = new CliPromptParser();
  const db = new Mongo();
  const interpreter = new CommandInterpreter(cli, commandParser, db);
  interpreter.start();
}

main();
