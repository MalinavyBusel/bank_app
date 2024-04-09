import mongoose from "mongoose";
import { Client, ClientRepository, clientTypes } from "./client.repository.js";
import { MongoBaseRepository } from "../mongo.base.repository.js";

export class MongoClientRepository
  extends MongoBaseRepository<Client>
  implements ClientRepository
{
  constructor() {
    super();
  }

  protected initModel() {
    const clientSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        type: {
          type: String,
          enum: clientTypes,
        },
      },
      { versionKey: false },
    );
    return mongoose.model("Client", clientSchema);
  }
}
