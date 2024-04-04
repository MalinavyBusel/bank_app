import { BankRepository } from "../repository/bank/bank.repository.js";
import { ClientRepository } from "../repository/client/client.repository.js";

export interface RepoFactory {
  getBankRepo: () => BankRepository;
  getClientRepo: () => ClientRepository;
}
