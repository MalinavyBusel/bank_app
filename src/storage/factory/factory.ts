import { BankRepository } from "../repository/bank/bank.repository.js";
import { ClientRepository } from "../repository/client/client.repository.js";
import { AccountRepository } from "../repository/account/account.repository.js";
import { TransactionRepository } from "../repository/transaction/transaction.repository.js";

export interface RepoFactory {
  getBankRepo: () => BankRepository;
  getClientRepo: () => ClientRepository;
  getAccountRepo: () => AccountRepository;
  getTransactionRepo: () => TransactionRepository;
}
