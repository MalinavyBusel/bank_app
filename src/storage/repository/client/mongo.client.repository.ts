import { ClientModel } from "../../model/client.model.js";
import { Client, ClientRepository, ClientWithId } from "./client.repository.js";
import { ObjectId } from "mongodb";

export class MongoClientRepo implements ClientRepository {
  public async create(
    name: string,
    type: "entity" | "individual",
  ): Promise<ClientWithId> {
    const client = await ClientModel.create({ name, type });
    return client;
  }

  public async getById(_id: ObjectId): Promise<ClientWithId | null> {
    const client = await ClientModel.findById(_id).exec();
    return client;
  }

  public async delete(_id: ObjectId): Promise<number> {
    const deleteRes = await ClientModel.deleteOne({ _id }).exec();
    return deleteRes.deletedCount;
  }

  public async update(_id: ObjectId, model: Client): Promise<number> {
    const updateRes = await ClientModel.updateOne({ _id }, model).exec();
    return updateRes.modifiedCount;
  }
}
