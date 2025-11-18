// service/database.js
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

// --- Load DB credentials safely ---
const configPath = path.resolve('./dbConfig.json'); 
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// --- Connect to MongoDB ---
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

const db = client.db('startup');  // keep your DB name

// --- Collections ---
const userCollection = db.collection('user');       // users
const postsCollection = db.collection('posts');     // NEW: posts collection

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

// --- Export everything backend needs ---
export { 
  client, 
  db, 
  userCollection, 
  postsCollection,   // <-- this fixes your error
  getUser, 
  addUser, 
  updateUser 
};

