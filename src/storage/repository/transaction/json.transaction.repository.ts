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

  protected getObjectIdFields(): string[] {
    return ["_id", "from", "to"];
  }

  public async deleteMany(_args: ModelFilter<Transaction>): Promise<number> {
    return 0;
  }

  getForThePeriod(
    accounts: Types.ObjectId[],
    startFrom: Date,
    endTo: Date,
  ): Promise<Transaction[]> {
    return this.find({
      from: { $in: accounts },
      datetime: { $gte: startFrom, $lte: endTo },
    });
  }
}
