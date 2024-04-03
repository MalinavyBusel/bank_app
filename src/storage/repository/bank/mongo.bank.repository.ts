import { BankModel } from "../../model/bank.model.js";
import { Bank, BankRepository } from "./bank.repository.js";

export class MongoBankRepo implements BankRepository {
  public async create(
    name: string,
    entityComission: number,
    individualComission: number,
  ) {
    const newBank = await BankModel.create({
      name,
      entityComission,
      individualComission,
    });
    return newBank.name;
  }

  public async getByName(name: string): Promise<Bank | null> {
    const bank = await BankModel.findOne({ name });
    if (bank == null) {
      return bank;
    }
    return {
      name: bank!.name,
      entityComission: bank!.entityComission,
      individualComission: bank!.individualComission,
    };
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
