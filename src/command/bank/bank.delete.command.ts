import { ObjectId } from "mongodb";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { BankRepository } from "../../storage/repository/bank/bank.repository.js";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { AccountRepository } from "../../storage/repository/account/account.repository.js";

export class BankDelete implements Command<DeleteBankArgs, number> {
  private readonly options: ArgOption[] = [
    { full: "id", short: "i", type: "string", required: true },
  ];

  readonly bankRepo: BankRepository;

  readonly accountRepo: AccountRepository;

  constructor(bankRepo: BankRepository, accountRepo: AccountRepository) {
    this.bankRepo = bankRepo;
    this.accountRepo = accountRepo;
  }

  public getOptions(): ArgOption[] {
    return this.options;
  }

  public getType(): string {
    return "bank";
  }

  public getName(): string {
    return "delete";
  }

  public validateArgs(args: Args): DeleteBankArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const id = ObjectId.createFromHexString(args["id"] as string);
    return { id };
  }

  public async execute(args: DeleteBankArgs): Promise<CommandResult<number>> {
    const { id } = args;
    await this.accountRepo.deleteMany({ bank: id });
    const deletedCount = await this.bankRepo.delete(id);
    if (deletedCount != 1) {
      return {
        statusCode: CommandStatus.Error,
        body: deletedCount,
      };
    }
    return { statusCode: CommandStatus.Ok, body: deletedCount };
  }
}

type DeleteBankArgs = {
  id: ObjectId;
};
