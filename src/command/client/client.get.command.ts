import { ObjectId } from "mongodb";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { ClientRepository } from "../../storage/repository/client/client.repository.js";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { Args } from "../../promptparser/prompt-parser.js";

export class ClientGet implements Command<ClientGetArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "id", short: "i", type: "string", required: true },
  ];

  private readonly clientRepo: ClientRepository;

  constructor(clientRepo: ClientRepository) {
    this.clientRepo = clientRepo;
  }

  public getOptions() {
    return this.options;
  }

  public getType() {
    return "client";
  }

  public getName() {
    return "get";
  }

  public validateArgs(args: Args): ClientGetArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const id = ObjectId.createFromHexString(args["id"] as string);
    return { _id: id };
  }

  public async execute(args: ClientGetArgs): Promise<CommandResult<string>> {
    const client = await this.clientRepo.getById(args._id);
    if (client == null) {
      return { statusCode: CommandStatus.Error, body: "" };
    }
    return { statusCode: CommandStatus.Ok, body: JSON.stringify(client) };
  }
}

export type ClientGetArgs = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId;
};
