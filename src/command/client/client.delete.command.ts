import { ObjectId } from "mongodb";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { ClientRepository } from "../../storage/repository/client/client.repository.js";

export class ClientDelete implements Command<ClientDeleteArgs, string> {
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
    return "delete";
  }

  public validateArgs(args: Args): ClientDeleteArgs {
    args = ArgValidator.validateArgs(args, this.getOptions());
    const id = ObjectId.createFromHexString(args["id"] as string);
    return { _id: id };
  }

  public async execute(args: ClientDeleteArgs): Promise<CommandResult<string>> {
    const deletedCount = await this.clientRepo.delete(args._id);
    if (deletedCount != 1) {
      return {
        statusCode: CommandStatus.Error,
        body: `deleted ${deletedCount} objects instead of 1`,
      };
    }
    return {
      statusCode: CommandStatus.Ok,
      body: `object with id ${args._id} successfully deleted`,
    };
  }
}

export type ClientDeleteArgs = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId;
};