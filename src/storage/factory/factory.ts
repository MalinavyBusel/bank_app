import { BankRepository } from "../repository/bank/bank.repository.js";

export interface RepoFactory {
  getBankRepo: () => BankRepository;
}
