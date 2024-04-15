import { JsonBaseRepository } from "../json.base.repository.js";
import { ModelFilter } from "../base.repository.js";
import {
  Transaction,
  TransactionRepository,
} from "./transaction.repository.js";
import { Types } from "mongoose";

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

  getForThePeriod(
    _accounts: Types.ObjectId[],
    _startFrom: Date,
    _endTo: Date,
  ): Promise<Transaction[]> {
    return Promise.resolve([]);
  }
}
