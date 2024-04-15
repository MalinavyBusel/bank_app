import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { Types } from "mongoose";
import {
  AccountRepository,
  currencyTypes,
} from "../../storage/repository/account/account.repository.js";
import { ObjectId } from "mongodb";
import { ClientRepository } from "../../storage/repository/client/client.repository.js";

export class AccountCreate implements Command<CreateAccountArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "bankId", type: "string", required: true },
    { full: "clientId", type: "string", required: true },
    { full: "amount", short: "a", type: "string", default: "0" },
    {
      full: "currency",
      short: "c",
      type: "enum",
      values: [...currencyTypes],
      default: currencyTypes[0],
    },
  ];

  private clientRepo: ClientRepository;

  private accountRepo: AccountRepository;

  constructor(accountRepo: AccountRepository, clientRepo: ClientRepository) {
    this.accountRepo = accountRepo;
    this.clientRepo = clientRepo;
  }

  getType(): string {
    return "account";
  }

  getName(): string {
    return "create";
  }

  getOptions(): ArgOption[] {
    return this.options;
  }

  validateArgs(args: Args): CreateAccountArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());

    const bank = ObjectId.createFromHexString(args["bankId"] as string);
    const client = ObjectId.createFromHexString(args["clientId"] as string);
    const amount = Number(args["amount"] as string);
    const currency = args["currency"] as (typeof currencyTypes)[number];

    return { bank, client, amount, currency };
  }

  async execute(args: CreateAccountArgs): Promise<CommandResult<string>> {
    const client = await this.clientRepo.getById(args.client);
    if (client == null) {
      return { statusCode: CommandStatus.Error, body: "" };
    }

    const account = await this.accountRepo.create(args);
    client.accounts.push(account._id);
    await this.clientRepo.update(client._id, client);
    return { statusCode: CommandStatus.Ok, body: account._id.toString() };
  }
}

export type CreateAccountArgs = {
  currency: (typeof currencyTypes)[number];
  bank: Types.ObjectId;
  client: Types.ObjectId;
  amount: number;
};
