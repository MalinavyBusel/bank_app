import { JsonBaseRepository } from "../json.base.repository.js";
import { ModelFilter } from "../base.repository.js";
import {
  Transaction,
  TransactionRepository,
} from "./transaction.repository.js";

export class JsonTransactionRepository
  extends JsonBaseRepository<Transaction>
  implements TransactionRepository
{
  constructor() {
    super();
  }

  protected getRepoName(): string {
    return "transaction";
  }

  public async deleteMany(_args: ModelFilter<Transaction>): Promise<number> {
    return 0;
  }
}
