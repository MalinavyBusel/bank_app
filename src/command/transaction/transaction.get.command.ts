import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import {
  TransactionRepository,
  TransactionWithId,
} from "../../storage/repository/transaction/transaction.repository.js";

export class TransactionGet
  implements Command<GetTransactionArgs, TransactionWithId | null>
{
  private readonly options: ArgOption[] = [
    { full: "id", type: "string", required: true },
  ];

  private transactionRepo: TransactionRepository;

  constructor(transactionRepo: TransactionRepository) {
    this.transactionRepo = transactionRepo;
  }

  getType(): string {
    return "transaction";
  }

  getName(): string {
    return "get";
  }

  getOptions(): ArgOption[] {
    return this.options;
  }

  validateArgs(args: Args): GetTransactionArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());

    const id = ObjectId.createFromHexString(args["id"] as string);

    return { id };
  }

  async execute(
    args: GetTransactionArgs,
  ): Promise<CommandResult<TransactionWithId | null>> {
    const transaction = await this.transactionRepo.getById(args.id);
    if (transaction == null) {
      return { statusCode: CommandStatus.Error, body: null };
    }
    return { statusCode: CommandStatus.Ok, body: transaction };
  }
}

export type GetTransactionArgs = {
  id: Types.ObjectId;
};
