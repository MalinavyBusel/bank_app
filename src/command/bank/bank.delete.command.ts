import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { BankRepository } from "../../storage/repository/bank/bank.repository.js";
import { Command, CommandResult, CommandStatus } from "../command.js";

export class BankDelete implements Command<DeleteBankArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string", required: true },
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
    return "delete";
  }

  public validateArgs(args: Args): DeleteBankArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const name = args["name"] as string;
    return { name };
  }

  public async execute(args: DeleteBankArgs): Promise<CommandResult<string>> {
    const { name } = args;
    const deletedCount = await this.bankRepo.delete(name);
    if (deletedCount != 1) {
      return {
        statusCode: CommandStatus.Error,
        body: `error while trying to delete bank '${name}'`,
      };
    }
    return { statusCode: CommandStatus.Ok, body: `bank '${name}' deleted` };
  }
}

type DeleteBankArgs = {
  name: string;
};
