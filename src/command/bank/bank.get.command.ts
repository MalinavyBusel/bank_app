import { ObjectId } from "mongodb";
import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { BankRepository } from "../../storage/repository/bank/bank.repository.js";
import { Command, CommandResult, CommandStatus } from "../command.js";

export class BankGet implements Command<GetBankArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "id", short: "i", type: "string", required: true },
  ];

  readonly bankRepo: BankRepository;

  constructor(bankRepo: BankRepository) {
    this.bankRepo = bankRepo;
  }

  public getOptions(): ArgOption[] {
    return this.options;
  }

  public getType(): string {
    return "bank";
  }

  public getName(): string {
    return "get";
  }

  public validateArgs(args: Args): GetBankArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const id = ObjectId.createFromHexString(args["id"] as string);
    return { id };
  }

  public async execute(args: GetBankArgs): Promise<CommandResult<string>> {
    const { id } = args;
    const bank = await this.bankRepo.getById(id);
    if (bank == null) {
      return { statusCode: CommandStatus.Error, body: "" };
    }
    return { statusCode: CommandStatus.Ok, body: JSON.stringify(bank) };
  }
}

type GetBankArgs = {
  id: ObjectId;
};
