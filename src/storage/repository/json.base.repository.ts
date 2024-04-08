import { Repository, WithId } from "./base.repository.js";
import { ObjectId } from "mongodb";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { cwd } from "node:process";

export abstract class JsonBaseRepository<T> implements Repository<T> {
  constructor() {
    fs.mkdir(this.getPathPrefix(), { recursive: true });
  }

  protected getPathPrefix(): string {
    return `${cwd()}/db/${this.getRepoName()}/`;
  }

  protected abstract getRepoName(): string;

  private getPath(id: string) {
    return this.getPathPrefix() + id + ".json";
  }

  public async create(model: T): Promise<T & WithId> {
    const _id = new ObjectId();
    const path = this.getPath(_id.toString());
    const obj = { _id, ...model };
    await fs.writeFile(path, JSON.stringify(obj));
    return obj;
  }

  public async getById(_id: ObjectId): Promise<(T & WithId) | null> {
    const path = this.getPath(_id.toString());
    if (existsSync(path)) {
      const data = await fs.readFile(path, "utf-8");
      return JSON.parse(data, (key: string, value: string) => {
        if (key === "_id") {
          return ObjectId.createFromHexString(value);
        }
        return value;
      });
    }
    return null;
  }

  public async delete(_id: ObjectId): Promise<number> {
    const path = this.getPath(_id.toString());
    if (existsSync(path)) {
      await fs.rm(path);
      return 1;
    }
    return 0;
  }

  public async update(_id: ObjectId, model: T): Promise<number> {
    const path = this.getPath(_id.toString());
    const obj = { _id, ...model };
    if (existsSync(path)) {
      await fs.writeFile(path, JSON.stringify(obj));
      return 1;
    }
    return 0;
  }
}
