import { Provider } from "./provider.js";
import { BankRepository } from "../repository/bank/bank.repository.js";
import { BankRepoMongo } from "../repository/bank/mongo.bank.repository.js";

export class MongoProvider implements Provider {
  bank: BankRepository;

  constructor() {
    this.bank = new BankRepoMongo();
  }
}
