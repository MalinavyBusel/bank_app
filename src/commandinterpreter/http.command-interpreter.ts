import http from "http";
import { CommandInterpreter } from "./command-interpreter.js";
import { CommandFactory } from "../commandfactory/command-factory.js";
import { HttpCommunicator } from "../cli/http.communicator.js";
import { CommandResult } from "../command/command.js";
import { HttpPromptParser } from "../promptparser/http.prompt-parser.js";

export class HttpCommandInterpreter extends CommandInterpreter<http.IncomingMessage> {
  protected readonly communicator: HttpCommunicator;

  protected readonly promptParser: HttpPromptParser;

  protected readonly commandFactory: CommandFactory;

  constructor(commandFactory: CommandFactory) {
    super();
    this.communicator = new HttpCommunicator();
    this.promptParser = new HttpPromptParser();
    this.commandFactory = commandFactory;
  }

  public async start() {
    const server = http.createServer(async (req, res) => {
      try {
        const commandResult = await this.runCommand(req);
        this.communicator.send(commandResult, res);
      } catch (error) {
        console.log(error);
        const result = this.handleError(error as Error);
        this.communicator.send<string>(result, res);
      }
    });

    const hostname = "0.0.0.0";
    server.listen(Number(process.env.HTTP_PORT), hostname, () => {
      console.log(
        `Server running at http://${hostname}:${process.env.HTTP_PORT}/`,
      );
    });
  }

  protected handleCommandResult<T>(_commandResult: CommandResult<T>): void {}
}
