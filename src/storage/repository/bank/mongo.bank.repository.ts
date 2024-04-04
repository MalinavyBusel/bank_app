import mongoose from "mongoose";
import { Bank, BankRepository, BankWithId } from "./bank.repository.js";
import { ObjectId } from "mongodb";

export class MongoBankRepository implements BankRepository {
  private readonly bankModel;

  constructor() {
    const bankSchema = new mongoose.Schema(
      {
        name: { type: String, unique: true, required: true },
        entityComission: { type: Number, required: true },
        individualComission: { type: Number, required: true },
      },
      { versionKey: false },
    );

    this.bankModel = mongoose.model("Bank", bankSchema);
  }

  public async create(model: Bank): Promise<BankWithId> {
    const newBank = await this.bankModel.create(model);
    return newBank;
  }

  public async getById(_id: ObjectId): Promise<BankWithId | null> {
    const bank = await this.bankModel.findById(_id).exec();
    return bank;
  }

  public async delete(_id: ObjectId): Promise<number> {
    const bank = await this.bankModel.deleteOne({ _id }).exec();
    return bank.deletedCount;
  }

  public async update(_id: ObjectId, model: Bank): Promise<number> {
    const b = await this.bankModel.updateOne({ _id }, { $set: model }).exec();
    return b.modifiedCount;
  }
}
