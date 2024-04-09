import { Types } from "mongoose";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { AccountRepository } from "../../storage/repository/account/account.repository.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { ObjectId } from "mongodb";

export class AccountDelete implements Command<DeleteAccountArgs, number> {
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
    return "delete";
  }

  getOptions(): ArgOption[] {
    return this.options;
  }

  validateArgs(args: Args): DeleteAccountArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());

    const id = ObjectId.createFromHexString(args["id"] as string);

    return { id };
  }

  async execute(args: DeleteAccountArgs): Promise<CommandResult<number>> {
    const count = await this.accountRepo.delete(args.id);
    if (count != 1) {
      return { statusCode: CommandStatus.Error, body: count };
    }
    return { statusCode: CommandStatus.Ok, body: count };
  }
}

export type DeleteAccountArgs = {
  id: Types.ObjectId;
};
