import { RepoFactory } from "./factory.js";
import { BankRepository } from "../repository/bank/bank.repository.js";
import { MongoBankRepository } from "../repository/bank/mongo.bank.repository.js";
import { ClientRepository } from "../repository/client/client.repository.js";
import { MongoClientRepository } from "../repository/client/mongo.client.repository.js";

export class MongoRepoFactory implements RepoFactory {
  private bankRepo: BankRepository;

  private clientRepo: ClientRepository;

  constructor() {
    this.bankRepo = new MongoBankRepository();
    this.clientRepo = new MongoClientRepository();
  }

  getBankRepo(): BankRepository {
    return this.bankRepo;
  }

  getClientRepo(): ClientRepository {
    return this.clientRepo;
  }
}
