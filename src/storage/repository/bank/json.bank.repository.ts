import { JsonBaseRepository } from "../json.base.repository.js";
import { Bank, BankRepository } from "./bank.repository.js";
import fs from "node:fs/promises";
import { cwd } from "node:process";

export class JsonBankRepository
  extends JsonBaseRepository<Bank>
  implements BankRepository
{
  constructor() {
    super();
    fs.mkdir(this.getPathPrefix(), { recursive: true });
  }

  protected getPathPrefix(): string {
    return `${cwd()}/db/bank/`;
  }
}
