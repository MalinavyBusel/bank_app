import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import {
  Account,
  AccountRepository,
  currencyTypes,
} from "../../storage/repository/account/account.repository.js";
import { ObjectId } from "mongodb";
import { ModelFilter } from "../../storage/repository/base.repository.js";
import { FindCommand } from "../find.command.js";

export class AccountFind
  extends FindCommand
  implements Command<FindAccountArgs, string>
{
  private readonly options: ArgOption[] = [
    { full: "bankId", type: "string" },
    { full: "clientId", type: "string" },
    {
      full: "amountOpt",
      type: "enum",
      values: ["$gte", "$gt", "$eq", "$lte", "$ne", "$lt"],
    },
    { full: "amountVal", type: "string" },
    {
      full: "currency",
      short: "c",
      type: "enum",
      values: [...currencyTypes],
    },
  ];

  private accountRepo: AccountRepository;

  constructor(accountRepo: AccountRepository) {
    super();
    this.accountRepo = accountRepo;
  }

  getType(): string {
    return "account";
  }

  getName(): string {
    return "find";
  }

  getOptions(): ArgOption[] {
    return this.options;
  }

  validateArgs(args: Args): FindAccountArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const filter: ModelFilter<Account> = {};

    if (args["bankId"]) {
      filter["bank"] = ObjectId.createFromHexString(args["bankId"] as string);
    }
    if (args["clientId"]) {
      filter["client"] = ObjectId.createFromHexString(
        args["clientId"] as string,
      );
    }
    if (args["amountOpt"] && args["amountVal"]) {
      filter["amount"] = this.newNumberSelector(
        args["amountOpt"] as string,
        Number(args["amountVal"]),
      );
    }
    if (args["currency"]) {
      filter["currency"] = args["currency"] as (typeof currencyTypes)[number];
    }

    return filter;
  }

  async execute(args: FindAccountArgs): Promise<CommandResult<string>> {
    const accounts = await this.accountRepo.find!(args);
    return { statusCode: CommandStatus.Ok, body: JSON.stringify(accounts) };
  }
}

export type FindAccountArgs = ModelFilter<Account>;
