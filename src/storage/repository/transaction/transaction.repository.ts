import { Types } from "mongoose";
import { Repository, WithId } from "../base.repository.js";
import { currencyTypes } from "../account/account.repository.js";

export interface TransactionRepository extends Repository<Transaction> {
  getForThePeriod(
    accounts: Types.ObjectId[],
    startFrom: Date,
    endTo: Date,
  ): Promise<Transaction[]>;
}

export type Transaction = {
  from: Types.ObjectId;
  to: Types.ObjectId;
  currency: (typeof currencyTypes)[number];
  datetime: Date;
  amount: number;
};
export type TransactionWithId = Transaction & WithId;
