import * as readline from "node:readline";
import { Speaker } from "./Speaker.js";

export class CliHandler implements Speaker {
  public async recieve(): Promise<string> {
    const i = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) =>
      i.question("> ", (prompt) => {
        i.close();
        resolve(prompt);
      }),
    );
  }

  public send(data: any) {
    console.log(data);
  }
}