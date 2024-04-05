import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { ClientRepository } from "../../storage/repository/client/client.repository.js";
import { Command, CommandResult, CommandStatus } from "../command.js";

export class ClientCreate implements Command<CreateClientArgs, string> {
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string", required: true },
    { full: "isEntity", short: "e", type: "boolean" },
  ];

  private clientRepo: ClientRepository;

  constructor(clientRepo: ClientRepository) {
    this.clientRepo = clientRepo;
  }

  public getType() {
    return "client";
  }

  public getName() {
    return "create";
  }

  public getOptions() {
    return this.options;
  }

  public validateArgs(args: Args): CreateClientArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const name = args["name"] as string;
    const type = args["isEntity"] === true ? "entity" : "individual";
    return { name, type };
  }

  public async execute(args: CreateClientArgs): Promise<CommandResult<string>> {
    const client = await this.clientRepo.create(args);
    return { statusCode: CommandStatus.Ok, body: client._id.toString() };
  }
}

export type CreateClientArgs = {
  name: string;
  type: "entity" | "individual";
};
