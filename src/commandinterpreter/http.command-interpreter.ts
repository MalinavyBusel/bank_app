import http from "http";
import { CommandInterpreter } from "./command-interpreter.js";
import { CommandFactory } from "../commandfactory/command-factory.js";
import { HttpCommunicator } from "../cli/http.communicator.js";
import { CommandResult } from "../command/command.js";
import { HttpPromptParser } from "../promptparser/http.prompt-parser.js";

export class HttpCommandInterpreter extends CommandInterpreter {
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
        // const prompt = await this.communicator.receive(req);
        const commandResult = await this.runCommand(req);
        this.communicator.send(commandResult, res);
        this.handleCommandResult(commandResult);
      } catch (error) {
        console.log(error);
        const result = this.handleError(error as Error);
        this.communicator.send<string>(result, res);
      }
    });

    server.listen(8080, "127.0.0.1", () => {
      console.log("Server running at http://127.0.0.1:8080/");
    });
  }

  protected handleCommandResult<T>(_commandResult: CommandResult<T>): void {}
}
