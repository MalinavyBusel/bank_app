import { ModelFilter, Repository, WithId } from "./base.repository.js";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { ObjectId } from "mongodb";

// КОРОЧЕ ТУТ ТАК СДЕЛАТЬ АНДРЕЙ РАЗЗРЕШИЛ, КРАСИВО НЕ ПОЛУЧИЛОСЬ ЧТО-ТО ПРИДУМАТЬ
export abstract class MongoBaseRepository<T> implements Repository<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected readonly model: Model<any, any, any, any, any, any>;

  constructor() {
    this.model = this.initModel();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract initModel(): Model<any, any, any, any, any, any>;

  public async create(model: T): Promise<T & WithId> {
    return await this.model.create(model);
  }

  public async getById(_id: ObjectId): Promise<(T & WithId) | null> {
    const client = await this.model.findById(_id).exec();
    return client;
  }

  public async delete(_id: ObjectId): Promise<number> {
    const deleteRes = await this.model.deleteOne({ _id }).exec();
    return deleteRes.deletedCount;
  }

  public async update(_id: ObjectId, model: T): Promise<number> {
    const updateRes = await this.model
      .updateOne({ _id: _id }, model as UpdateQuery<never>)
      .exec();
    return updateRes.modifiedCount;
  }

  public async find(filter: ModelFilter<T>): Promise<T[]> {
    const res = await this.model.find(filter as FilterQuery<T>);
    return res;
  }
}
