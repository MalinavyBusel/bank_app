import { ObjectId } from "mongodb";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import {
  ClientRepository,
  ClientWithId,
} from "../../storage/repository/client/client.repository.js";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { Args } from "../../promptparser/prompt-parser.js";

export class ClientGet implements Command<ClientGetArgs, ClientWithId | null> {
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
    args = ArgValidator.validateArgs(args, this.getOptions());
    const id = ObjectId.createFromHexString(args["id"] as string);
    return { _id: id };
  }

  public async execute(
    args: ClientGetArgs,
  ): Promise<CommandResult<ClientWithId | null>> {
    const client = await this.clientRepo.getById(args._id);
    if (client == null) {
      return { statusCode: CommandStatus.Error, body: null };
    }
    return { statusCode: CommandStatus.Ok, body: client };
  }
}

export type ClientGetArgs = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId;
};
