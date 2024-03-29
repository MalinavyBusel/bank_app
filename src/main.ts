import { CliHandler } from "./cli/cli.communicator.js";
import { CliPromptParser } from "./promptparser/cli.prompt-parser.js";
import { CommandInterpreter } from "./commandinterpreter/command-interpreter.js";
import { Mongo } from "./db/mongo.connector.js";

function main() {
  const cli = new CliHandler();
  const commandParser = new CliPromptParser();
  const db = new Mongo();
  const interpreter = new CommandInterpreter(cli, commandParser, db);
  interpreter.start();
}

main();
