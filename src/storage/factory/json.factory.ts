import { BankRepository } from "../repository/bank/bank.repository.js";
import { JsonBankRepository } from "../repository/bank/json.bank.repository.js";
import { ClientRepository } from "../repository/client/client.repository.js";
import { JsonClientRepository } from "../repository/client/json.client.repository.js";
import { RepoFactory } from "./factory.js";
import { AccountRepository } from "../repository/account/account.repository.js";
import { JsonAccountRepository } from "../repository/account/json.account.repository.js";

export class JsonRepoFactory implements RepoFactory {
  private bankRepo: BankRepository;

  private clientRepo: ClientRepository;

  private accountRepo: AccountRepository;

  constructor() {
    this.bankRepo = new JsonBankRepository();
    this.clientRepo = new JsonClientRepository();
    this.accountRepo = new JsonAccountRepository();
  }

  getBankRepo(): BankRepository {
    return this.bankRepo;
  }

  getClientRepo(): ClientRepository {
    return this.clientRepo;
  }

  getAccountRepo(): AccountRepository {
    return this.accountRepo;
  }
}
