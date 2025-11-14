import { client, collection, init } from "./database.js";

async function main() {
  await init();

  await collection.insertOne({
    name: "Test House",
    beds: 2
  });

  const results = await collection.find().toArray();
  console.log(results);

  await client.close();
}

main();
