import { BankRepository } from "../repository/bank/bank.repository.js";
import { JsonBankRepository } from "../repository/bank/json.bank.repository.js";
import { ClientRepository } from "../repository/client/client.repository.js";
import { JsonClientRepository } from "../repository/client/json.client.repository.js";
import { RepoFactory } from "./factory.js";
import { AccountRepository } from "../repository/account/account.repository.js";
import { JsonAccountRepository } from "../repository/account/json.account.repository.js";
import { TransactionRepository } from "../repository/transaction/transaction.repository.js";
import { JsonTransactionRepository } from "../repository/transaction/json.transaction.repository.js";

export class JsonRepoFactory implements RepoFactory {
  private bankRepo: BankRepository;

  private clientRepo: ClientRepository;

  private accountRepo: AccountRepository;

  private transactionRepo: TransactionRepository;

  constructor() {
    this.bankRepo = new JsonBankRepository();
    this.clientRepo = new JsonClientRepository();
    this.accountRepo = new JsonAccountRepository();
    this.transactionRepo = new JsonTransactionRepository();
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

  getTransactionRepo(): TransactionRepository {
    return this.transactionRepo;
  }
}
