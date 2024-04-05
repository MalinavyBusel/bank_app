import mongoose from "mongoose";
import { Bank, BankRepository } from "./bank.repository.js";
import { MongoBaseRepository } from "../mongo.base.repository.js";

export class MongoBankRepository
  extends MongoBaseRepository<Bank>
  implements BankRepository
{
  constructor() {
    super();
  }

  protected initModel() {
    const bankSchema = new mongoose.Schema(
      {
        name: { type: String, unique: true, required: true },
        entityComission: { type: Number, required: true },
        individualComission: { type: Number, required: true },
      },
      { versionKey: false },
    );
    return mongoose.model("Bank", bankSchema);
  }
}
