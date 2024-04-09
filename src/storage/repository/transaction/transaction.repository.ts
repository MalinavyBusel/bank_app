import { Types } from "mongoose";
import { ModelFilter, Repository, WithId } from "../base.repository.js";
import { currencyTypes } from "../account/account.repository.js";

export interface TransactionRepository extends Repository<Transaction> {
  deleteMany(args: ModelFilter<Transaction>): Promise<number>;
}

export type Transaction = {
  from: Types.ObjectId;
  to: Types.ObjectId;
  currency: (typeof currencyTypes)[number];
  datetime: Date;
  amount: number;
};
export type TransactionWithId = Transaction & WithId;
