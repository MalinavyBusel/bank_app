import { ObjectId } from "mongodb";
import { Repository, WithId } from "../base.repository.js";

export interface ClientRepository extends Repository<Client> {
  create(model: Client): Promise<ClientWithId>;
  getById(id: ObjectId): Promise<ClientWithId | null>;
  delete(id: ObjectId): Promise<number>;
  update(id: ObjectId, model: Client): Promise<number>;
}

export type Client = {
  name: string;
  type: "entity" | "individual";
};

export type ClientWithId = Client & WithId;
