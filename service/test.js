import { userCollection, addUser, getUser } from "./database.js";

(async () => {
  // Add a test user
  await addUser({ username: "test", passwordHash: "hashedpassword123" });

  // Fetch the test user
  const user = await getUser("test");
  console.log(user);

  // Close the DB connection when done
  process.exit(0);
})();
