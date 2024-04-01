//import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export class Mongo {
  //private conn: typeof mongoose
  public async connect(): Promise<void> {
    // const url = process.env.MONGO_URL;
    // if (url === undefined) {
    //   throw new Error("unable to connect to given address");
    // }
    // this.conn = await mongoose.connect(url);
  }

  public close(): void {
    //this.conn.di
  }
}
