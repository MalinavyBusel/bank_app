import mongoose from "mongoose";
import { Client, ClientRepository, ClientWithId } from "./client.repository.js";
import { ObjectId } from "mongodb";

export class MongoClientRepository implements ClientRepository {
  private readonly clientModel;

  constructor() {
    const clientSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        type: {
          type: String,
          enum: ["entity", "individual"],
          default: "individual",
        },
      },
      { versionKey: false },
    );

    this.clientModel = mongoose.model("Client", clientSchema);
  }

  public async create(
    name: string,
    type: "entity" | "individual",
  ): Promise<ClientWithId> {
    const client = await this.clientModel.create({ name, type });
    return client;
  }

  public async getById(_id: ObjectId): Promise<ClientWithId | null> {
    const client = await this.clientModel.findById(_id).exec();
    return client;
  }

  public async delete(_id: ObjectId): Promise<number> {
    const deleteRes = await this.clientModel.deleteOne({ _id }).exec();
    return deleteRes.deletedCount;
  }

  public async update(_id: ObjectId, model: Client): Promise<number> {
    const updateRes = await this.clientModel.updateOne({ _id }, model).exec();
    return updateRes.modifiedCount;
  }
}
