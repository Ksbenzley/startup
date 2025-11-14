// dbtest.js
import { initDB, addUser, getUserByUsername } from "./database.js";

async function main() {
  await initDB();
  // try inserting a test user (with a dummy hash)
  try {
    await addUser({ username: "testuser", passwordHash: "dummy-hash" });
    const u = await getUserByUsername("testuser");
    console.log("Inserted user:", u);
  } catch (e) {
    console.error("Error (maybe duplicate):", e.message);
  } finally {
    process.exit(0);
  }
}

main();
