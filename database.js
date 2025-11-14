import { MongoClient } from "mongodb";
import config from "./dbConfig.json" with { type: "json" };

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

const db = client.db("rental");
const collection = db.collection("house");

export async function init() {
  try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
}

export { client, db, collection };
