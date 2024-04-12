import { Types } from "mongoose";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { TransactionRepository } from "../../storage/repository/transaction/transaction.repository.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { ObjectId } from "mongodb";
import {
  Account,
  AccountRepository,
} from "../../storage/repository/account/account.repository.js";
import {
  BankRepository,
  BankWithId,
} from "../../storage/repository/bank/bank.repository.js";
import {
  Client,
  ClientRepository,
} from "../../storage/repository/client/client.repository.js";
import { WithId } from "../../storage/repository/base.repository.js";
import { convertCurrency } from "../../helpers/currency.converter.js";

export class TransactionCreate
  implements Command<CreateTransactionArgs, string>
{
  private readonly options: ArgOption[] = [
    { full: "from", short: "f", type: "string", required: true },
    { full: "to", short: "t", type: "string", required: true },
    { full: "amount", short: "a", type: "string", required: true },
  ];

  private readonly transactionRepo: TransactionRepository;

  private readonly bankRepo: BankRepository;

  private readonly accountRepo: AccountRepository;

  private readonly clientRepo: ClientRepository;

  constructor(
    transactionRepo: TransactionRepository,
    bankRepo: BankRepository,
    accountRepo: AccountRepository,
    clientRepo: ClientRepository,
  ) {
    this.transactionRepo = transactionRepo;
    this.bankRepo = bankRepo;
    this.accountRepo = accountRepo;
    this.clientRepo = clientRepo;
  }

  getType() {
    return "transaction";
  }

  getName() {
    return "create";
  }

  getOptions() {
    return this.options;
  }

  validateArgs(args: Args): CreateTransactionArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());

    const from = ObjectId.createFromHexString(args["from"] as string);
    const to = ObjectId.createFromHexString(args["to"] as string);
    const amount = Number(args["amount"] as string);
    const datetime = new Date();

    return { from, to, amount, datetime };
  }

  async execute(args: CreateTransactionArgs): Promise<CommandResult<string>> {
    const fromAcc = await this.accountRepo.getById(args.from);
    const toAcc = await this.accountRepo.getById(args.to);
    const client = await this.clientRepo.getById(fromAcc!.client);
    const bank = await this.bankRepo.getById(fromAcc!.bank);
    if (fromAcc == null || toAcc == null || client == null || bank == null) {
      return {
        statusCode: CommandStatus.Error,
        body: "invalid id provided, no such record",
      };
    }

    const amountWithComission = this.calculateAmountWithComission(
      bank,
      toAcc.bank,
      client,
      args.amount,
    );
    if (amountWithComission > fromAcc.amount) {
      return { statusCode: CommandStatus.Error, body: "not enough money" };
    }

    await this.updateBalance(fromAcc, amountWithComission, toAcc, args.amount);

    const transaction = await this.transactionRepo.create({
      ...args,
      datetime: new Date(),
      currency: fromAcc.currency,
    });
    return { statusCode: CommandStatus.Ok, body: transaction._id.toString() };
  }

  private calculateAmountWithComission(
    bank: BankWithId,
    targetBankId: Types.ObjectId,
    client: Client,
    amount: number,
  ) {
    if (bank._id == targetBankId) {
      return amount;
    }
    let comission = 0;
    if (client!.type == "individual") {
      comission = bank!.individualComission;
    } else {
      comission = bank!.entityComission;
    }
    return amount * ((100 + comission) / 100);
  }

  private async updateBalance(
    from: Account & WithId,
    amountWithComission: number,
    to: Account & WithId,
    amount: number,
  ) {
    const converted = await convertCurrency(from.currency, to.currency, amount);
    from.amount -= amountWithComission;
    await this.accountRepo.update(from._id, from);
    to.amount = to.amount + converted;
    await this.accountRepo.update(to._id, to);
  }
}

export type CreateTransactionArgs = {
  datetime: Date;
  amount: number;
  from: Types.ObjectId;
  to: Types.ObjectId;
};
