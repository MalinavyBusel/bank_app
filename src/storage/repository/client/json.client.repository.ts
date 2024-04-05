import { JsonBaseRepository } from "../json.base.repository.js";
import { Client, ClientRepository } from "./client.repository.js";
import fs from "node:fs/promises";
import { cwd } from "node:process";

export class JsonClientRepository
  extends JsonBaseRepository<Client>
  implements ClientRepository
{
  constructor() {
    super();
    fs.mkdir(this.getPathPrefix(), { recursive: true });
  }

  protected getPathPrefix(): string {
    return `${cwd()}/db/client/`;
  }
}
