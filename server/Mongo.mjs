import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.REACT_APP_MONGO_CON;
const client = new MongoClient(connectionString);

let conn = await client.connect();
try {
  conn = await client.connect();
  console.log("Connected");
} catch (e) {
  console.error(e);
}

export const db = await con.db("Codeninjas");
