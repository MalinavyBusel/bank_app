import { ArgOption, ArgValidator } from "../../argvalidator/arg-validator.js";
import { Args } from "../../promptparser/prompt-parser.js";
import { ModelFilter } from "../../storage/repository/base.repository.js";
import {
  Client,
  ClientRepository,
} from "../../storage/repository/client/client.repository.js";
import { Command, CommandResult, CommandStatus } from "../command.js";
import { FindCommand } from "../find.command.js";

export class ClientFind
  extends FindCommand
  implements Command<FindClientArgs, Client[]>
{
  private readonly options: ArgOption[] = [
    { full: "name", short: "n", type: "string" },
    { full: "isEntity", short: "e", type: "boolean" },
  ];

  private clientRepo: ClientRepository;

  constructor(clientRepo: ClientRepository) {
    super();
    this.clientRepo = clientRepo;
  }

  public getType() {
    return "client";
  }

  public getName() {
    return "find";
  }

  public getOptions() {
    return this.options;
  }

  public validateArgs(args: Args): FindClientArgs {
    const validator = new ArgValidator();
    args = validator.validateArgs(args, this.getOptions());
    const filter: ModelFilter<Client> = {};

    if (args["name"]) {
      filter["name"] = args["name"] as string;
    }
    if (args["isEntity"] != undefined) {
      const type = args["isEntity"] === true ? "entity" : "individual";
      filter["type"] = type;
    }

    return filter;
  }

  public async execute(args: FindClientArgs): Promise<CommandResult<Client[]>> {
    const clients = await this.clientRepo.find!(args);
    return { statusCode: CommandStatus.Ok, body: clients };
  }
}

export type FindClientArgs = ModelFilter<Client>;
