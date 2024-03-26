import { DataTransfer } from "../../interfaces/DataTransfer";
import { PromptParser } from "../../interfaces/PromptParser";
import { Factory } from "../Command/Factory";

export class CommandInterpreter {
  private dataTransfer: DataTransfer;
  private promptParser: PromptParser;
  private commandFactory: Factory;

  constructor(
    dataTransfer: DataTransfer,
    promptParser: PromptParser,
    commandFactory: Factory,
  ) {
    this.dataTransfer = dataTransfer;
    this.promptParser = promptParser;
    this.commandFactory = commandFactory;
  }

  public async start() {
    let prompt = await this.dataTransfer.recieve();
    while (prompt != "exit") {
      const commandDescriptor = this.promptParser.parse(prompt);
      const command = this.commandFactory.getCommand(commandDescriptor);
      console.log(command.parseArgs(commandDescriptor.args));
      this.dataTransfer.send(command.execute());
      prompt = await this.dataTransfer.recieve();
    }
  }
}
