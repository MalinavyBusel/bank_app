import { ObjectId } from "mongodb";
import { Repository, WithId } from "../base.repository.js";

export interface BankRepository extends Repository<Bank> {
  create(model: Bank): Promise<BankWithId>;
  getById(id: ObjectId): Promise<BankWithId | null>;
  delete(id: ObjectId): Promise<number>;
  update(id: ObjectId, model: Bank): Promise<number>;
}

export type Bank = {
  name: string;
  entityComission: number;
  individualComission: number;
};

export type BankWithId = Bank & WithId;
