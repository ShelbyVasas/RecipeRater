import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
export const client = new MongoClient(process.env.MONGODBCONNECTION);
//# sourceMappingURL=connect.js.map