import { ObjectId } from "mongodb";

export interface ClientRepository {
  create(name: string, type: "entity" | "individual"): Promise<ClientWithId>;
  getById(id: ObjectId): Promise<ClientWithId | null>;
  delete(id: ObjectId): Promise<number>;
  update(id: ObjectId, model: Client): Promise<number>;
}

export type Client = {
  name: string;
  type: "entity" | "individual";
};

export type ClientWithId = Client & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: ObjectId;
};
