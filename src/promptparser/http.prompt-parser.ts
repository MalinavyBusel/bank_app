import {
  Args,
  CommandDescriptor,
  PromptParser,
  ArgumentParsingError,
} from "./prompt-parser.js";
import { parse as parseQuery } from "node:querystring";
import http from "http";

export class HttpPromptParser implements PromptParser<http.IncomingMessage> {
  async parse(req: http.IncomingMessage): Promise<CommandDescriptor> {
    let args;
    let url = req.url!;
    if (req.method == "GET") {
      const qArgs = url.split("?")[1];
      url = url.split("?")[0];
      args = parseQuery(qArgs) as Args;
    } else {
      args = await this.getBody(req);
    }
    const pieces = url.split("/");
    if (pieces.length < 3) {
      throw new ArgumentParsingError(
        "command url must be in format of '/resourse/operation'",
      );
    }
    return { command: pieces[1], subCommand: pieces[2], args };
  }

  private async getBody(req: http.IncomingMessage): Promise<Args> {
    return new Promise((resolve) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      });
    });
  }
}
