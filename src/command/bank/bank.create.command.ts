import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgValidator, ArgOption } from "../../argvalidator/arg-validator.js";
import { Provider } from "../../storage/provider/provider.js";
import { Args } from "../../promptparser/prompt-parser.js";

export class BankCreate implements Command<CreateBankArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string", required: true },
    { full: "entity", short: "e", type: "string", default: "1" },
    { full: "ind", short: "i", type: "string" },
  ];

  readonly provider: Provider;

  constructor(provider: Provider) {
    this.provider = provider;
  }

  protected getOptions(): ArgOption[] {
    return this.options;
  }

  public getType(): string {
    return "bank";
  }

  public getName(): string {
    return "create";
  }

  public validateArgs(args: Args): CreateBankArgs {
    args = ArgValidator.validateArgs(args, this.options);
    const name = args["name"] as string;
    const entityComission = Number(args["entity"] as string);
    const individualComission = Number(args["ind"] as string);
    return { name, entityComission, individualComission };
  }

  public async execute(args: CreateBankArgs): Promise<CommandResult<string>> {
    const { name, entityComission, individualComission } = args;
    const bankId = await this.provider.bank.create(
      name,
      entityComission,
      individualComission,
    );
    return { statusCode: CommandStatus.Ok, body: bankId };
  }
}

type CreateBankArgs = {
  name: string;
  entityComission: number;
  individualComission: number;
};
