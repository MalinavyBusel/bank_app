import { DataTransfer } from "../../interfaces/DataTransfer";
import { PromptParser } from "../../interfaces/PromptParser";

export class CommandInterpreter {
    private dataTransfer: DataTransfer;
    private promptParser: PromptParser;
    constructor(dataTransfer: DataTransfer, promptParser: PromptParser) {
        this.dataTransfer = dataTransfer;
        this.promptParser = promptParser;
    }

    public async start() {
        while (true) {
            const prompt = await this.dataTransfer.recieve();
            const commandDescriptor = this.promptParser.parse(prompt);
            this.dataTransfer.send(commandDescriptor.command);
        }
    }
}