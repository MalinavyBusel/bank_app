import { MongoBaseRepository } from "../mongo.base.repository.js";
import {
  Transaction,
  TransactionRepository,
} from "./transaction.repository.js";
import mongoose, { Types } from "mongoose";
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
        from: { type: Types.ObjectId, ref: "Account", required: true },
        to: { type: Types.ObjectId, ref: "Account", required: true },
        datetime: Date,
        currency: { type: String, enum: currencyTypes },
        amount: Number,
      },
      { versionKey: false },
    );
    return mongoose.model("Transaction", transactionSchema);
  }

  async getForThePeriod(
    accounts: Types.ObjectId[],
    startFrom: Date,
    endTo: Date,
  ): Promise<Transaction[]> {
    return this.model.find({
      from: { $in: accounts },
      datetime: { $gte: startFrom, $lte: endTo },
    });
  }
}
