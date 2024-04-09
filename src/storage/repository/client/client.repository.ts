import { Repository, WithId } from "../base.repository.js";

export interface ClientRepository extends Repository<Client> {}

export type Client = {
  name: string;
  type: (typeof clientTypes)[number];
};

export const clientTypes = ["entity", "individual"] as const;
export type ClientWithId = Client & WithId;
