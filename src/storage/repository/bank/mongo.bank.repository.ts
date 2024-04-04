import { BankModel } from "../../model/bank.model.js";
import { Bank, BankRepository, BankWithId } from "./bank.repository.js";

export class MongoBankRepo implements BankRepository {
  public async create(
    name: string,
    entityComission: number,
    individualComission: number,
  ): Promise<BankWithId> {
    const newBank = await BankModel.create({
      name,
      entityComission,
      individualComission,
    });
    return newBank;
  }

  public async getByName(name: string): Promise<BankWithId | null> {
    const bank = await BankModel.findOne({ name });
    return bank;
  }

  public async delete(name: string): Promise<number> {
    const bank = await BankModel.deleteOne({ name });
    return bank.deletedCount;
  }

  public async update(bank: Bank): Promise<number> {
    const { name, entityComission, individualComission } = bank;
    const b = await BankModel.updateOne(
      { name },
      { $set: { entityComission, individualComission } },
    ).exec();
    return b.modifiedCount;
  }
}
