export interface BankRepository {
  create: (
    name: string,
    entityComission: number,
    individualComission: number,
  ) => Promise<string>;
}
