import { ObjectId } from "mongodb";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { Args } from "../../promptparser/prompt-parser.js";
import {
  Transaction,
  TransactionRepository,
} from "../../storage/repository/transaction/transaction.repository.js";
import { ClientRepository } from "../../storage/repository/client/client.repository.js";

export class ClientTransactions
  implements Command<ClientTransactionsArgs, Transaction[]>
{
  private readonly options: ArgOption[] = [
    { full: "id", short: "i", type: "string", required: true },
    { full: "start", short: "s", type: "string" },
    { full: "end", short: "e", type: "string" },
  ];

  private readonly clientRepo: ClientRepository;

  private readonly transactionRepo: TransactionRepository;

  constructor(
    transactionRepo: TransactionRepository,
    clientRepo: ClientRepository,
  ) {
    this.transactionRepo = transactionRepo;
    this.clientRepo = clientRepo;
  }

  public getOptions() {
    return this.options;
  }

  public getType() {
    return "client";
  }

  public getName() {
    return "transactions";
  }

  public validateArgs(args: Args): ClientTransactionsArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const id = ObjectId.createFromHexString(args["id"] as string);
    let start = new Date(1970, 0, 1);
    if (args["start"] != undefined) {
      start = new Date(args["start"] as string);
    }
    let end = new Date();
    if (args["end"] != undefined) {
      end = new Date(args["end"] as string);
    }
    return { _id: id, start, end };
  }

  public async execute(
    args: ClientTransactionsArgs,
  ): Promise<CommandResult<Transaction[]>> {
    const client = await this.clientRepo.getById(args._id);
    if (client == null) {
      return { statusCode: CommandStatus.Error, body: [] };
    }

    const transactions = await this.transactionRepo.getForThePeriod(
      client.accounts,
      args.start,
      args.end,
    );
    return { statusCode: CommandStatus.Ok, body: transactions };
  }
}

export type ClientTransactionsArgs = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId;
  start: Date;
  end: Date;
};
