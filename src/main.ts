import { CliCommunicator } from "./cli/cli.communicator.js";
import { CliPromptParser } from "./promptparser/cli.prompt-parser.js";
import { CommandInterpreter } from "./commandinterpreter/command-interpreter.js";
import { StorageCreator } from "./storage/storage.creator.js";
import { CommandFactory } from "./commandfactory/command-factory.js";

async function main() {
  const cli = new CliCommunicator();
  const commandParser = new CliPromptParser();
  const storage = StorageCreator.new();
  const commandFactory = new CommandFactory(storage.newRepoFactory());
  const interpreter = new CommandInterpreter(
    cli,
    commandParser,
    commandFactory,
  );

  await storage.connect();
  await interpreter.start();
  await storage.close();
}

main();
