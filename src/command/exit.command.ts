import { ArgOption } from "../argvalidator/arg-validator.js";
import { Args } from "../promptparser/prompt-parser.js";
import { Provider } from "../storage/provider/provider.js";
import { Command, CommandResult, CommandStatus } from "./command.js";

export class Exit implements Command<undefined, string> {
  private readonly options: ArgOption[] = [];

  readonly provider: Provider;

  constructor(provider: Provider) {
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

  public validateArgs(_args: Args): undefined {}

  public async execute(_args?: undefined): Promise<CommandResult<string>> {
    return {
      statusCode: CommandStatus.Exit,
      body: "exit received, shutting down.",
    };
  }
}
