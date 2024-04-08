import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgValidator, ArgOption } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import {
  Bank,
  BankRepository,
} from "../../storage/repository/bank/bank.repository.js";

export class BankFind implements Command<FindBankArgs, Bank[]> {
  private readonly options: ArgOption[] = [
    { full: "nameOpt", type: "string" },
    { full: "nameVal", type: "string" },
    { full: "entityOpt", type: "string" },
    { full: "entityVal", type: "string" },
    { full: "indOpt", type: "string" },
    { full: "indVal", type: "string" },
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
    return "find";
  }

  public validateArgs(args: Args): FindBankArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());

    const name = args["name"] as string;
    return { name, entityComission: 0, individualComission: 0 };
  }

  public async execute(args: FindBankArgs): Promise<CommandResult<Bank[]>> {
    const banks = await this.bankRepo.find!(args);
    return { statusCode: CommandStatus.Ok, body: banks };
  }
}

// type FindBankArgs = ModelFilter<Bank>;
type FindBankArgs = {
  name: string;
  entityComission: number;
  individualComission: number;
};
