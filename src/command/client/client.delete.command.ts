import { ObjectId } from "mongodb";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { ClientRepository } from "../../storage/repository/client/client.repository.js";
import { AccountRepository } from "../../storage/repository/account/account.repository.js";

export class ClientDelete implements Command<ClientDeleteArgs, number> {
  private readonly options: ArgOption[] = [
    { full: "id", short: "i", type: "string", required: true },
  ];

  private readonly clientRepo: ClientRepository;

  private readonly accountRepo: AccountRepository;

  constructor(clientRepo: ClientRepository, accountRepo: AccountRepository) {
    this.clientRepo = clientRepo;
    this.accountRepo = accountRepo;
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
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const id = ObjectId.createFromHexString(args["id"] as string);
    return { _id: id };
  }

  public async execute(args: ClientDeleteArgs): Promise<CommandResult<number>> {
    await this.accountRepo.deleteMany({ client: args._id });
    const deletedCount = await this.clientRepo.delete(args._id);
    if (deletedCount != 1) {
      return {
        statusCode: CommandStatus.Error,
        body: deletedCount,
      };
    }
    return {
      statusCode: CommandStatus.Ok,
      body: deletedCount,
    };
  }
}

export type ClientDeleteArgs = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId;
};
