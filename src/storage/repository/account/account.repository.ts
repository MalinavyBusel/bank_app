import { ModelFilter, Repository, WithId } from "../base.repository.js";
import { Types } from "mongoose";

export interface AccountRepository extends Repository<Account> {
  deleteMany(args: ModelFilter<Account>): Promise<number>;
}

export type Account = {
  currency: (typeof currencyTypes)[number];
  bank: Types.ObjectId;
  client: Types.ObjectId;
  amount: number;
};
export const currencyTypes = ["dollars", "euros", "rubles"] as const;
export type AccountWithId = Account & WithId;
