import { Repository, WithId } from "../base.repository.js";
import { Types } from "mongoose";

export interface ClientRepository extends Repository<Client> {}

export type Client = {
  name: string;
  type: (typeof clientTypes)[number];
  accounts: Types.ObjectId[];
};

export const clientTypes = ["entity", "individual"] as const;
export type ClientWithId = Client & WithId;
