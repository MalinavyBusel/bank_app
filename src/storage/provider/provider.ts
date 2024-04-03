import { BankRepository } from "../repository/bank/bank.repository.js";

export interface Provider {
  bank: BankRepository;
}
