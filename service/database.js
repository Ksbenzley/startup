// service/database.js
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

// --- Load DB credentials safely ---
const configPath = path.resolve('./dbConfig.json'); // adjust if needed
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// --- Connect to MongoDB ---
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');  // replace 'startup' with your DB name
const userCollection = db.collection('user');

// --- Test DB connection ---
(async () => {
  try {
    await db.command({ ping: 1 });
    console.log(`✅ Connected to DB at ${config.hostname}`);
  } catch (err) {
    console.error(`❌ Failed to connect to DB: ${err.message}`);
    process.exit(1);
  }
})();

// --- User functions ---
async function getUser(username) {
  return userCollection.findOne({ username });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne(
    { username: user.username },
    { $set: user }
  );
}

// --- Export for backend usage ---
export { client, db, userCollection, getUser, addUser, updateUser };
