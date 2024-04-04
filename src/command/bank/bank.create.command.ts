import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgValidator, ArgOption } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { BankRepository } from "../../storage/repository/bank/bank.repository.js";

export class BankCreate implements Command<CreateBankArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string", required: true },
    { full: "entity", short: "e", type: "string", default: "1" },
    { full: "ind", short: "d", type: "string" },
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
    return "create";
  }

  public validateArgs(args: Args): CreateBankArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const name = args["name"] as string;
    const entityComission = Number(args["entity"] as string);
    const individualComission = Number(args["ind"] as string);
    return { name, entityComission, individualComission };
  }

  public async execute(args: CreateBankArgs): Promise<CommandResult<string>> {
    const bank = await this.bankRepo.create(args);
    return { statusCode: CommandStatus.Ok, body: bank._id.toString() };
  }
}

type CreateBankArgs = {
  name: string;
  entityComission: number;
  individualComission: number;
};
