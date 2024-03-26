import {input} from "@inquirer/prompts";

export class CliHandler {
    public async recieve(): Promise<string> {
        return input({ message: ">>"});
    }
    public send(data: string) {
        console.log(data)
    }
}