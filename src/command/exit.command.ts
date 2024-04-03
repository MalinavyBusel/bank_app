import {
  ArgOption,
  ArgValidator,
  ValidatedArgs,
} from "../argvalidator/arg-validator.js";
import { Provider } from "../storage/provider/provider.js";
import { Command, CommandResult, CommandStatus } from "./command.js";

export class Exit extends ArgValidator implements Command {
  private readonly options: ArgOption[] = [];

  readonly provider: Provider;

  constructor(provider: Provider) {
    super();
    this.provider = provider;
  }

  protected getOptions(): ArgOption[] {
    return this.options;
  }

  public getType(): string {
    return "exit";
  }

  public getName(): string {
    return "";
  }

  public async execute(_args: ValidatedArgs): Promise<CommandResult<string>> {
    return {
      statusCode: CommandStatus.Exit,
      body: "exit received, shutting down.",
    };
  }
}
