import { ObjectId } from "mongodb";
import { Types } from "mongoose";

export interface Repository<T> {
  create(model: T): Promise<T & WithId>;
  getById(id: ObjectId): Promise<(T & WithId) | null>;
  update(id: ObjectId, model: T): Promise<number>;
  delete(id: ObjectId): Promise<number>;
}

export type WithId = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: Types.ObjectId;
};
