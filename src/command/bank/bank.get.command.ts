import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import {
  Bank,
  BankRepository,
} from "../../storage/repository/bank/bank.repository.js";
import { Command, CommandResult, CommandStatus } from "../command.js";

export class BankGet implements Command<GetBankArgs, Bank | null> {
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string", required: true },
  ];

  readonly bankRepo: BankRepository;

  constructor(bankRepo: BankRepository) {
    this.bankRepo = bankRepo;
  }

  protected getOptions(): ArgOption[] {
    return this.options;
  }

  public getType(): string {
    return "bank";
  }

  public getName(): string {
    return "get";
  }

  public validateArgs(args: Args): GetBankArgs {
    args = ArgValidator.validateArgs(args, this.getOptions());
    const name = args["name"] as string;
    return { name };
  }

  public async execute(args: GetBankArgs): Promise<CommandResult<Bank | null>> {
    const { name } = args;
    const bank = await this.bankRepo.getByName(name);
    if (bank == null) {
      return { statusCode: CommandStatus.Error, body: null };
    }
    return { statusCode: CommandStatus.Ok, body: bank };
  }
}

type GetBankArgs = {
  name: string;
};
