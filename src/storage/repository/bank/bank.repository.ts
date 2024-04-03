export interface BankRepository {
  create: (
    name: string,
    entityComission: number,
    individualComission: number,
  ) => Promise<string>;
  getByName: (name: string) => Promise<Bank | null>;
  delete(name: string): Promise<number>;
  update(bank: Bank): Promise<number>;
}

export type Bank = {
  name: string;
  entityComission: number;
  individualComission: number;
};
