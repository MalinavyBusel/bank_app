import { ObjectId } from "mongodb";

export interface BankRepository {
  create(
    name: string,
    entityComission: number,
    individualComission: number,
  ): Promise<BankWithId>;
  getByName(name: string): Promise<BankWithId | null>;
  delete(name: string): Promise<number>;
  update(bank: Bank): Promise<number>;
}

export type Bank = {
  name: string;
  entityComission: number;
  individualComission: number;
};

export type BankWithId = Bank & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId;
};
