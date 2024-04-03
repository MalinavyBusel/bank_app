import { Command, CommandResult, CommandStatus } from "../command.js";
import {
  ArgValidator,
  ArgOption,
  ValidatedArgs,
} from "../../argvalidator/arg-validator.js";
import { Provider } from "../../storage/provider/provider.js";

export class BankCreate extends ArgValidator implements Command {
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string", required: true },
    { full: "entity", short: "e", type: "string", default: "1" },
    { full: "ind", short: "i", type: "string" },
  ];

  readonly provider: Provider;

  constructor(provider: Provider) {
    super();
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

  public async execute(args: ValidatedArgs): Promise<CommandResult<string>> {
    const name = args["name"] as string;
    const entityComission = Number(args["entity"] as string);
    const individualComission = Number(args["ind"] as string);
    const bankId = await this.provider.bank.create(
      name,
      entityComission,
      individualComission,
    );
    return { statusCode: CommandStatus.Ok, body: bankId };
  }
}
