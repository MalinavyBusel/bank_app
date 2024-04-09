import { MongoBaseRepository } from "../mongo.base.repository.js";
import {
  Transaction,
  TransactionRepository,
} from "./transaction.repository.js";
import mongoose from "mongoose";
import { ModelFilter } from "../base.repository.js";
import { currencyTypes } from "../account/account.repository.js";

export class MongoTransactionRepository
  extends MongoBaseRepository<Transaction>
  implements TransactionRepository
{
  constructor() {
    super();
  }

  protected initModel() {
    const transactionSchema = new mongoose.Schema(
      {
        from: {},
        to: {},
        datetime: Date,
        currency: { type: String, enum: currencyTypes },
        amount: Number,
      },
      { versionKey: false },
    );
    return mongoose.model("Transaction", transactionSchema);
  }

  public async deleteMany(_args: ModelFilter<Transaction>): Promise<number> {
    const deletedCount = await this.model.deleteMany(_args);
    return deletedCount;
  }
}
