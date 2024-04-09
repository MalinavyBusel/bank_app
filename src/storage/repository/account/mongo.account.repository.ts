import mongoose, { Types } from "mongoose";
import { MongoBaseRepository } from "../mongo.base.repository.js";
import {
  Account,
  AccountRepository,
  currencyTypes,
} from "./account.repository.js";

export class MongoAccountRepository
  extends MongoBaseRepository<Account>
  implements AccountRepository
{
  constructor() {
    super();
  }

  protected initModel() {
    const accountSchema = new mongoose.Schema(
      {
        currency: { type: String, enum: currencyTypes },
        bank: { type: Types.ObjectId, ref: "Bank", required: true },
        client: { type: Types.ObjectId, ref: "Client", required: true },
        amount: Number,
      },
      { versionKey: false },
    );
    return mongoose.model("Account", accountSchema);
  }
}
