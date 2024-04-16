import { ObjectId } from "mongodb";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { AccountRepository } from "../../storage/repository/account/account.repository.js";

export class ClientAccounts implements Command<ClientAccountsArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "id", short: "i", type: "string", required: true },
  ];

  private readonly accountRepo: AccountRepository;

  constructor(accountRepo: AccountRepository) {
    this.accountRepo = accountRepo;
  }

  public getOptions() {
    return this.options;
  }

  public getType() {
    return "client";
  }

  public getName() {
    return "accounts";
  }

  public validateArgs(args: Args): ClientAccountsArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const id = ObjectId.createFromHexString(args["id"] as string);
    return { _id: id };
  }

  public async execute(
    args: ClientAccountsArgs,
  ): Promise<CommandResult<string>> {
    const accounts = await this.accountRepo.find({ client: args._id });
    return { statusCode: CommandStatus.Ok, body: JSON.stringify(accounts) };
  }
}

export type ClientAccountsArgs = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId;
};
