import * as readline from "readline";
import { Communicator } from "./communicator.js";

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

  public send<T>(data: T): void {
    console.log(data);
  }
}
