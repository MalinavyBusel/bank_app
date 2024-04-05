import { Repository, WithId } from "../base.repository.js";

export interface BankRepository extends Repository<Bank> {}

export type Bank = {
  name: string;
  entityComission: number;
  individualComission: number;
};

export type BankWithId = Bank & WithId;
