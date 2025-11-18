// service/index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { getUser, addUser, updateUser, userCollection, postsCollection } from './database.js';
import cors from 'cors';

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());

// --- CORS configuration ---
const frontendOrigin = process.env.NODE_ENV === 'production'
  ? 'https://jammix.click'
  : 'http://localhost:5173';

app.use(cors({
  origin: frontendOrigin,
  credentials: true,
}));

const port = 4000;

app.use(express.static('public'));

// --- TEST ENDPOINT ---
app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// -----------------------------
//       POSTS ENDPOINTS
// -----------------------------

// Get all posts (persistent)
app.get('/api/posts', async (_req, res) => {
  const allPosts = await postsCollection.find().toArray();
  res.json(allPosts);
});

// Create a new post (persistent)
app.post('/api/posts', async (req, res) => {
  const { title, description, userName, instruments } = req.body;

  if (!title || !userName) {
    return res.status(400).json({ error: 'Title and username are required' });
  }

  const newPost = {
    id: uuidv4(),
    title,
    description: description || '',
    userName,
    instruments: instruments || [],
    createdAt: new Date(),
  };

  await postsCollection.insertOne(newPost);

  res.status(201).json(newPost);
});

// -----------------------------
//     USER AUTHENTICATION
// -----------------------------

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  const existingUser = await getUser(username);
  if (existingUser)
    return res.status(400).json({ error: 'Username already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  await addUser({ username, passwordHash, token: null });

  res.status(201).json({ message: 'User registered successfully' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);

  if (!user) return res.status(401).json({ error: 'Invalid username or password' });

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) return res.status(401).json({ error: 'Invalid username or password' });

  const token = uuidv4();
  await updateUser({ ...user, token });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  res.json({ message: 'Login successful' });
});

// Logout
app.post('/api/logout', async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const user = await userCollection.findOne({ token });
    if (user) await updateUser({ ...user, token: null });
  }
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// Restricted
app.get('/api/secret', async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const user = await userCollection.findOne({ token });
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  res.json({ message: `Welcome, ${user.username}! This is a secret.` });
});

// Catch-all for frontend
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
