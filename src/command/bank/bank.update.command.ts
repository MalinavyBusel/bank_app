import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgValidator, ArgOption } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { BankRepository } from "../../storage/repository/bank/bank.repository.js";

export class BankUpdate implements Command<UpdateBankArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string", required: true },
    { full: "entity", short: "e", type: "string" },
    { full: "ind", short: "i", type: "string" },
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
    return "update";
  }

  public validateArgs(args: Args): UpdateBankArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const name = args["name"] as string;
    const entityComission =
      args["entity"] === "" ? undefined : Number(args["entity"] as string);
    const individualComission =
      args["ind"] === "" ? undefined : Number(args["ind"] as string);
    return { name, entityComission, individualComission };
  }

  public async execute(args: UpdateBankArgs): Promise<CommandResult<string>> {
    const { name, entityComission, individualComission } = args;
    const bank = await this.bankRepo.getByName(name);
    if (bank == null) {
      return {
        statusCode: CommandStatus.Error,
        body: `no bank '${name}' to update`,
      };
    }
    bank.entityComission = entityComission
      ? entityComission
      : bank.entityComission;
    bank.individualComission = individualComission
      ? individualComission
      : bank.individualComission;

    const updateCount = await this.bankRepo.update(bank);
    if (updateCount != 1) {
      return {
        statusCode: CommandStatus.Error,
        body: `error while trying to update bank '${name}'`,
      };
    }
    return { statusCode: CommandStatus.Ok, body: `bank '${name}' updated` };
  }
}

type UpdateBankArgs = {
  name: string;
  entityComission?: number;
  individualComission?: number;
};
