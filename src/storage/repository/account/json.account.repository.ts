import { JsonBaseRepository } from "../json.base.repository.js";
import { Account, AccountRepository } from "./account.repository.js";
import { ModelFilter, WithId } from "../base.repository.js";
import fs from "node:fs/promises";
import { filterRecord } from "../../../helpers/record.filter.js";

export class JsonAccountRepository
  extends JsonBaseRepository<Account>
  implements AccountRepository
{
  constructor() {
    super();
  }

  protected getObjectIdFields(): string[] {
    return ["bank", "client", "_id"];
  }

  protected getRepoName(): string {
    return "account";
  }

  public async deleteMany(filter: ModelFilter<Account>): Promise<number> {
    let count = 0;
    const prefix = this.getPathPrefix();
    const recordNames = await this.getRecordFilenames(prefix);
    for (const recordName of recordNames) {
      const data = await fs.readFile(prefix + recordName, "utf-8");
      const record: Account & WithId = this.parseRecord(data);
      if (filterRecord<Account>(record, filter)) {
        await fs.rm(prefix + recordName);
        count += 1;
      }
    }
    return count;
  }
}
