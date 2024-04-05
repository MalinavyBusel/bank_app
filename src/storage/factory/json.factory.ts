import { BankRepository } from "../repository/bank/bank.repository.js";
import { JsonBankRepository } from "../repository/bank/json.bank.repository.js";
import { ClientRepository } from "../repository/client/client.repository.js";
import { JsonClientRepository } from "../repository/client/json.client.repository.js";
import { RepoFactory } from "./factory.js";

export class JsonRepoFactory implements RepoFactory {
  private bankRepo: BankRepository;

  private clientRepo: ClientRepository;

  constructor() {
    this.bankRepo = new JsonBankRepository();
    this.clientRepo = new JsonClientRepository();
  }

  getBankRepo(): BankRepository {
    return this.bankRepo;
  }

  getClientRepo(): ClientRepository {
    return this.clientRepo;
  }
}
