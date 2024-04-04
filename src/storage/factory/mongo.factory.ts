import { RepoFactory } from "./factory.js";
import { BankRepository } from "../repository/bank/bank.repository.js";
import { MongoBankRepo } from "../repository/bank/mongo.bank.repository.js";
import { ClientRepository } from "../repository/client/client.repository.js";
import { MongoClientRepo } from "../repository/client/mongo.client.repository.js";

export class MongoRepoFactory implements RepoFactory {
  getBankRepo(): BankRepository {
    return new MongoBankRepo();
  }

  getClientRepo(): ClientRepository {
    return new MongoClientRepo();
  }
}
