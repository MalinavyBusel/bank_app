import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

export class Mongo {
    public async connect() {
        const url = process.env.MONGO_URL;
        if (url === undefined) {
            throw new Error('unable to connect to given address')
        }
        await mongoose.connect(url)
    }
}
