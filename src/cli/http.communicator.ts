import { Communicator } from "./communicator.js";
import { CommandResult, CommandStatus } from "../command/command.js";
import http from "http";

export class HttpCommunicator implements Communicator {
  public async receive(_obj: http.IncomingMessage) {
    // console.log(obj.url);
    // return obj.url!;
    return "";
  }

  public send<T>(data: CommandResult<T>, obj: http.ServerResponse): void {
    obj.statusCode = this.getStatusCode(data.statusCode);
    obj.end(String(data.body));
  }

  private getStatusCode(statusCode: CommandStatus): number {
    switch (statusCode) {
      case CommandStatus.Ok:
        return 200;
      case CommandStatus.InnerError:
        return 500;
      case CommandStatus.Error:
      case CommandStatus.Exit:
        return 400;
    }
  }
}
