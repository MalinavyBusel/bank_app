import mongoose from "mongoose";
import { Bank, BankRepository, BankWithId } from "./bank.repository.js";

export class MongoBankRepo implements BankRepository {
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

  public async create(
    name: string,
    entityComission: number,
    individualComission: number,
  ): Promise<BankWithId> {
    const newBank = await this.bankModel.create({
      name,
      entityComission,
      individualComission,
    });
    return newBank;
  }

  public async getByName(name: string): Promise<BankWithId | null> {
    const bank = await this.bankModel.findOne({ name });
    return bank;
  }

  public async delete(name: string): Promise<number> {
    const bank = await this.bankModel.deleteOne({ name });
    return bank.deletedCount;
  }

  public async update(bank: Bank): Promise<number> {
    const { name, entityComission, individualComission } = bank;
    const b = await this.bankModel
      .updateOne({ name }, { $set: { entityComission, individualComission } })
      .exec();
    return b.modifiedCount;
  }
}
