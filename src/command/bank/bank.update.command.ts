import { Command, CommandResult, CommandStatus } from "../command.js";
import { ArgValidator, ArgOption } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { BankRepository } from "../../storage/repository/bank/bank.repository.js";
import { ObjectId } from "mongodb";

export class BankUpdate implements Command<UpdateBankArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string" },
    { full: "id", short: "i", type: "string", required: true },
    { full: "entity", short: "e", type: "string" },
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
    return "update";
  }

  public validateArgs(args: Args): UpdateBankArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const name = args["name"] === "" ? undefined : (args["name"] as string);
    const entityComission =
      args["entity"] === "" ? undefined : Number(args["entity"] as string);
    const individualComission =
      args["ind"] === "" ? undefined : Number(args["ind"] as string);
    const id = ObjectId.createFromHexString(args["id"] as string);
    return { id, name, entityComission, individualComission };
  }

  public async execute(args: UpdateBankArgs): Promise<CommandResult<string>> {
    const { id, ...model } = args;
    const bank = await this.bankRepo.getById(id);
    if (bank == null) {
      return {
        statusCode: CommandStatus.Error,
        body: `no bank with id '${id}' to update`,
      };
    }
    bank.entityComission = model.entityComission
      ? model.entityComission
      : bank.entityComission;
    bank.individualComission = model.individualComission
      ? model.individualComission
      : bank.individualComission;
    bank.name = model.name ? model.name : bank.name;

    const updateCount = await this.bankRepo.update(id, bank);
    if (updateCount != 1) {
      return {
        statusCode: CommandStatus.Error,
        body: `error while trying to update bank '${bank.name}, updated ${updateCount} records'`,
      };
    }
    return {
      statusCode: CommandStatus.Ok,
      body: `bank '${bank.name}' updated`,
    };
  }
}

type UpdateBankArgs = {
  id: ObjectId;
  name?: string;
  entityComission?: number;
  individualComission?: number;
};
