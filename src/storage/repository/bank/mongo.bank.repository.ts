import { Bank } from "../../model/bank.model.js";
import { BankRepository } from "./bank.repository.js";

export class MongoBankRepo implements BankRepository {
  public async create(
    name: string,
    entityComission: number,
    individualComission: number,
  ) {
    const newUser = await Bank.create({
      name,
      entityComission,
      individualComission,
    });
    return newUser.name;
  }
}
