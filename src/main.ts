import { StorageCreator } from "./storage/storage.creator.js";
import { CommandInterpreterCreator } from "./commandinterpreter/command-interpreter.creator.js";
import { CommandFactory } from "./commandfactory/command-factory.js";

async function main() {
  const storage = StorageCreator.new();
  const commandFactory = new CommandFactory(storage.newRepoFactory());
  const interpreter = CommandInterpreterCreator.new(commandFactory);

  await storage.connect();
  await interpreter.start();
  process.on("exit", async () => {
    await storage.close();
    process.exit(0);
  });
}

main();
