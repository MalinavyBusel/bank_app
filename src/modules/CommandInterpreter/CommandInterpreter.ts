import { DataTransfer } from "../../interfaces/DataTransfer";
import { PromptParser } from "../../interfaces/PromptParser";
import { Factory } from "../Command/Factory";

export class CommandInterpreter {
    private dataTransfer: DataTransfer;
    private promptParser: PromptParser;
    private factory: Factory;

    constructor(dataTransfer: DataTransfer, promptParser: PromptParser, factory: Factory) {
        this.dataTransfer = dataTransfer;
        this.promptParser = promptParser;
        this.factory = factory;
    }

    public async start() {
        while (true) {
            const prompt = await this.dataTransfer.recieve();
            const commandDescriptor = this.promptParser.parse(prompt);
            const command = this.factory.getCommand(commandDescriptor);
            this.dataTransfer.send(command.execute());
        }
    }
}
