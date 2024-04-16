import { JsonBaseRepository } from "../json.base.repository.js";
import { Bank, BankRepository } from "./bank.repository.js";

export class JsonBankRepository
  extends JsonBaseRepository<Bank>
  implements BankRepository
{
  protected getRepoName(): string {
    return "bank";
  }

  constructor() {
    super();
  }

  protected getObjectIdFields(): string[] {
    return ["_id"];
  }
}
