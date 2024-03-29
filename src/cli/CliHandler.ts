import * as readline from "readline";
import { Communicator } from "./Communicator.js";

export class CliHandler implements Communicator {
  public async recieve(): Promise<string> {
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

  public send<T>(data: T) {
    console.log(data);
  }

  public close(): void {
    process.exit();
  }
}
