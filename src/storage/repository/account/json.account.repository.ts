import { JsonBaseRepository } from "../json.base.repository.js";
import { Account, AccountRepository } from "./account.repository.js";

export class JsonAccountRepository
  extends JsonBaseRepository<Account>
  implements AccountRepository
{
  constructor() {
    super();
  }

  protected getRepoName(): string {
    return "account";
  }
}
