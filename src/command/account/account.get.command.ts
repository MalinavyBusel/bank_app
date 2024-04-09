import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { Types } from "mongoose";
import {
  AccountRepository,
  AccountWithId,
} from "../../storage/repository/account/account.repository.js";
import { ObjectId } from "mongodb";

export class AccountGet
  implements Command<GetAccountArgs, AccountWithId | null>
{
  private readonly options: ArgOption[] = [
    { full: "id", type: "string", required: true },
  ];

  private accountRepo: AccountRepository;

  constructor(accountRepo: AccountRepository) {
    this.accountRepo = accountRepo;
  }

  getType(): string {
    return "account";
  }

  getName(): string {
    return "get";
  }

  getOptions(): ArgOption[] {
    return this.options;
  }

  validateArgs(args: Args): GetAccountArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());

    const id = ObjectId.createFromHexString(args["id"] as string);

    return { id };
  }

  async execute(
    args: GetAccountArgs,
  ): Promise<CommandResult<AccountWithId | null>> {
    const account = await this.accountRepo.getById(args.id);
    if (account == null) {
      return { statusCode: CommandStatus.Error, body: null };
    }
    return { statusCode: CommandStatus.Ok, body: account };
  }
}

export type GetAccountArgs = {
  id: Types.ObjectId;
};
