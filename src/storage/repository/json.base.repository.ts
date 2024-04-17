import { ModelFilter, Repository, WithId } from "./base.repository.js";
import { ObjectId } from "mongodb";
import fs from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import { cwd } from "node:process";
import { filterRecord } from "../../helpers/record.filter.js";

export abstract class JsonBaseRepository<T> implements Repository<T> {
  constructor() {
    mkdirSync(this.getPathPrefix(), { recursive: true });
  }

  protected getPathPrefix(): string {
    return `${cwd()}/db/${this.getRepoName()}/`;
  }

  protected abstract getRepoName(): string;

  protected abstract getObjectIdFields(): string[];

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
      return this.parseRecord(data);
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

  public async find(filter: ModelFilter<T>): Promise<(T & WithId)[]> {
    const records: (T & WithId)[] = [];
    const prefix = this.getPathPrefix();
    const recordNames = await this.getRecordFilenames(prefix);
    for (const recordName of recordNames) {
      const data = await fs.readFile(prefix + recordName, "utf-8");
      const record: T & WithId = this.parseRecord(data);
      if (filterRecord<T>(record, filter)) {
        records.push(record);
      }
    }
    return records;
  }

  protected parseRecord(data: string): T & WithId {
    return JSON.parse(data, (key: string, value: string) => {
      if (this.keyIsObjectId(key)) {
        switch (typeof value) {
          case "string":
            return ObjectId.createFromHexString(value);
          case "object":
            return (value as Array<string>).map((val) =>
              ObjectId.createFromHexString(val),
            );
          default:
            break;
        }
      }
      return value;
    });
  }

  protected keyIsObjectId(key: string): boolean {
    return this.getObjectIdFields().includes(key);
  }

  protected async getRecordFilenames(dirname: string): Promise<string[]> {
    const files = await fs.readdir(dirname);
    return files.filter((file: string) => file.endsWith(".json"));
  }
}
