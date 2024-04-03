import { RepoFactory } from "./factory.js";
import { BankRepository } from "../repository/bank/bank.repository.js";
import { MongoBankRepo } from "../repository/bank/mongo.bank.repository.js";

export class MongoRepoFactory implements RepoFactory {
  getBankRepo(): BankRepository {
    return new MongoBankRepo();
  }
}
