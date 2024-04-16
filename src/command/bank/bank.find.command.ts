import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgValidator, ArgOption } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import {
  Bank,
  BankRepository,
} from "../../storage/repository/bank/bank.repository.js";
import { ModelFilter } from "../../storage/repository/base.repository.js";
import { FindCommand } from "../find.command.js";

export class BankFind
  extends FindCommand
  implements Command<FindBankArgs, string>
{
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string" },
    {
      full: "entityOpt",
      type: "enum",
      values: ["$gte", "$gt", "$eq", "$lte", "$ne", "$lt"],
    },
    { full: "entityVal", type: "string" },
    {
      full: "indOpt",
      type: "enum",
      values: ["$gte", "$gt", "$eq", "$lte", "$ne", "$lt"],
    },
    { full: "indVal", type: "string" },
  ];

  readonly bankRepo: BankRepository;

  constructor(bankRepo: BankRepository) {
    super();
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
    const filter: ModelFilter<Bank> = {};

    if (args["name"]) {
      filter["name"] = args["name"] as string;
    }
    if (args["entityOpt"] && args["entityVal"]) {
      filter["entityComission"] = this.newNumberSelector(
        args["entityOpt"] as string,
        Number(args["entityVal"]),
      );
    }
    if (args["indOpt"] && args["indVal"]) {
      filter["individualComission"] = this.newNumberSelector(
        args["indOpt"] as string,
        Number(args["indVal"]),
      );
    }

    return filter;
  }

  public async execute(args: FindBankArgs): Promise<CommandResult<string>> {
    const banks = await this.bankRepo.find!(args);
    return { statusCode: CommandStatus.Ok, body: JSON.stringify(banks) };
  }
}

type FindBankArgs = ModelFilter<Bank>;
