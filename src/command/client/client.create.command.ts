import { ObjectId } from "mongodb";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { ClientRepository } from "../../storage/repository/client/client.repository.js";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { Types } from "mongoose";
import {
  AccountRepository,
  currencyTypes,
} from "../../storage/repository/account/account.repository.js";

export class ClientCreate implements Command<CreateClientArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string", required: true },
    { full: "bankId", short: "b", type: "string", required: true },
    { full: "isEntity", short: "e", type: "boolean" },
    { full: "currency", short: "c", type: "enum", values: [...currencyTypes] },
  ];

  private clientRepo: ClientRepository;

  private accountRepo: AccountRepository;

  constructor(clientRepo: ClientRepository, accountRepo: AccountRepository) {
    this.clientRepo = clientRepo;
    this.accountRepo = accountRepo;
  }

  public getType() {
    return "client";
  }

  public getName() {
    return "create";
  }

  public getOptions() {
    return this.options;
  }

  public validateArgs(args: Args): CreateClientArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const name = args["name"] as string;
    const type = args["isEntity"] === true ? "entity" : "individual";
    const bank = ObjectId.createFromHexString(args["bankId"] as string);
    const currency = args["currency"] as (typeof currencyTypes)[number];
    return { name, type, bank, currency };
  }

  public async execute(args: CreateClientArgs): Promise<CommandResult<string>> {
    const { name, type } = args;
    const client = await this.clientRepo.create({ name, type, accounts: [] });
    const account = await this.accountRepo.create({
      bank: args.bank,
      client: client._id,
      amount: 0,
      currency: args.currency,
    });
    client.accounts.push(account._id);
    await this.clientRepo.update(client._id, client);
    return { statusCode: CommandStatus.Ok, body: client._id.toString() };
  }
}

export type CreateClientArgs = {
  name: string;
  type: "entity" | "individual";
  bank: Types.ObjectId;
  currency: (typeof currencyTypes)[number];
};
