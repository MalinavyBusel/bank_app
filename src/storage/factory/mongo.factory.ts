import { RepoFactory } from "./factory.js";
import { BankRepository } from "../repository/bank/bank.repository.js";
import { MongoBankRepo } from "../repository/bank/mongo.bank.repository.js";
import { ClientRepository } from "../repository/client/client.repository.js";
import { MongoClientRepo } from "../repository/client/mongo.client.repository.js";

export class MongoRepoFactory implements RepoFactory {
  private bankRepo: BankRepository;

  private clientRepo: ClientRepository;

  constructor() {
    this.bankRepo = new MongoBankRepo();
    this.clientRepo = new MongoClientRepo();
  }

  getBankRepo(): BankRepository {
    return this.bankRepo;
  }

  getClientRepo(): ClientRepository {
    return this.clientRepo;
  }
}
