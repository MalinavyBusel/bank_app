import { JsonBaseRepository } from "../json.base.repository.js";
import { Client, ClientRepository } from "./client.repository.js";

export class JsonClientRepository
  extends JsonBaseRepository<Client>
  implements ClientRepository
{
  protected getRepoName(): string {
    return "client";
  }

  constructor() {
    super();
  }
}
