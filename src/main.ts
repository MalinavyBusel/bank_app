import { CliCommunicator } from "./cli/cli.communicator.js";
import { CliPromptParser } from "./promptparser/cli.prompt-parser.js";
import { CommandInterpreter } from "./commandinterpreter/command-interpreter.js";
import { MongoStorageManager } from "./storage/mongo.manager.js";

function main() {
  const cli = new CliCommunicator();
  const commandParser = new CliPromptParser();
  const storage = new MongoStorageManager();
  const interpreter = new CommandInterpreter(cli, commandParser, storage);
  interpreter.start();
}

main();
