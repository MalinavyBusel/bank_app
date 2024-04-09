import { RepoFactory } from "./factory.js";
import { BankRepository } from "../repository/bank/bank.repository.js";
import { MongoBankRepository } from "../repository/bank/mongo.bank.repository.js";
import { ClientRepository } from "../repository/client/client.repository.js";
import { MongoClientRepository } from "../repository/client/mongo.client.repository.js";
import { AccountRepository } from "../repository/account/account.repository.js";
import { MongoAccountRepository } from "../repository/account/mongo.account.repository.js";
import { TransactionRepository } from "../repository/transaction/transaction.repository.js";
import { MongoTransactionRepository } from "../repository/transaction/mongo.transaction.repository.js";

export class MongoRepoFactory implements RepoFactory {
  private bankRepo: BankRepository;

  private clientRepo: ClientRepository;

  private accountRepo: AccountRepository;

  private transactionRepo: TransactionRepository;

  constructor() {
    this.bankRepo = new MongoBankRepository();
    this.clientRepo = new MongoClientRepository();
    this.accountRepo = new MongoAccountRepository();
    this.transactionRepo = new MongoTransactionRepository();
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
