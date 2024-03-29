import * as readline from "node:readline/promises";
import { Communicator } from "./Communicator.js";

export class CliHandler implements Communicator {
  private readonly reader: readline.Interface

  constructor() {
    this.reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public async recieve(): Promise<string> {
    // return new Promise((resolve) =>
    //   i.question("> ", (prompt) => {
    //     //i.close();
    //     resolve(prompt);
    //   }),
    // );
    return this.reader.question('> ');
  }

  public send<T>(data: T) {
    console.log(data);
  }

  public close(): void {
    process.exit()
  }
}
