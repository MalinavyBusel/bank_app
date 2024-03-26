import { DataTransfer } from "../../interfaces/DataTransfer";

export class CommandInterpreter {
    private dataTransfer: DataTransfer;
    constructor(dataTransfer: DataTransfer) {
        this.dataTransfer = dataTransfer;
    }

    public async start() {
        console.log();
        while (true) {
            const prompt = await this.dataTransfer.recieve();
            this.dataTransfer.send(prompt)
        }
    }
}