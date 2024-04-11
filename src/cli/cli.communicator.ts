import * as readline from "readline";
import { Communicator } from "./communicator.js";
import { CommandResult } from "../command/command.js";

export class CliCommunicator implements Communicator {
  public async receive(): Promise<string> {
    const i = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise((resolve) => {
      i.question("> ", (prompt) => {
        i.close();
        resolve(prompt);
      });
    });
  }

  public send<T>(data: CommandResult<T>): void {
    console.log(data.body);
  }
}
