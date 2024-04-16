import { JsonBaseRepository } from "../json.base.repository.js";
import { Account, AccountRepository } from "./account.repository.js";
import { ModelFilter } from "../base.repository.js";

export class JsonAccountRepository
  extends JsonBaseRepository<Account>
  implements AccountRepository
{
  constructor() {
    super();
  }

  protected getObjectIdFields(): string[] {
    return ["bank", "client", "_id"];
  }

  protected getRepoName(): string {
    return "account";
  }

  public async deleteMany(_args: ModelFilter<Account>): Promise<number> {
    return 0;
  }
}
