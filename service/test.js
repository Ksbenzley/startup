// service/testDB.js
import fetch from 'node-fetch';
import { addUser, getUser, updateUser } from './database.js';

async function test() {
  console.log('--- Testing Database Functions ---');

  // 1️⃣ Add a test user directly to MongoDB
  const testUser = { username: 'testuser', passwordHash: 'hashedpassword123' };
  await addUser(testUser);
  console.log('✅ Added test user to MongoDB');

  // 2️⃣ Fetch the user from MongoDB
  const fetchedUser = await getUser('testuser');
  console.log('✅ Fetched user:', fetchedUser);

  // 3️⃣ Update the user
  await updateUser({ username: 'testuser', passwordHash: 'newhashedpassword' });
  const updatedUser = await getUser('testuser');
  console.log('✅ Updated user password:', updatedUser.passwordHash);

  // 4️⃣ Test backend endpoints
  console.log('\n--- Testing Backend Endpoints ---');

  // Register a new user via backend
  const registerResponse = await fetch('http://localhost:4000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'apiuser', password: 'mypassword' }),
  });
  console.log('Register status:', registerResponse.status);
  console.log('Register body:', await registerResponse.json());

  // Login the user via backend
  const loginResponse = await fetch('http://localhost:4000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'apiuser', password: 'mypassword' }),
  });
  console.log('Login status:', loginResponse.status);
  console.log('Login body:', await loginResponse.json());
}

test().catch(err => console.error(err));
