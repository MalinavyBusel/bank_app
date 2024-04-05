import { Repository, WithId } from "../base.repository.js";

export interface ClientRepository extends Repository<Client> {}

export type Client = {
  name: string;
  type: "entity" | "individual";
};

export type ClientWithId = Client & WithId;
