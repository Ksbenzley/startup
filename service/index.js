// service/index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { getUser, addUser, updateUser, usersCollection } from './database.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Port
const port = 4000;

// Serve static frontend content (public folder)
app.use(express.static('public'));

// --- In-memory storage for posts ---
const posts = []; // { id, title, description, userName, image, requests, proposals }

// --- Initialize database ---
await initDB(); // connect to MongoDB before handling requests

// --- Test Endpoint ---
app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// --- Posts Endpoints ---
// Get all posts
app.get('/api/posts', (_req, res) => {
  res.json(posts);
});

// Create a new post
app.post('/api/posts', (req, res) => {
  const { title, description, userName, image, requests } = req.body;

  if (!title || !userName) {
    return res.status(400).json({ error: 'Title and username are required' });
  }

  const newPost = {
    id: uuidv4(),
    title,
    description: description || '',
    userName,
    image: image || '',
    requests: requests || [],
    proposals: [],
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// --- User Authentication ---

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  // Check if user exists in MongoDB
  const existingUser = await usersCollection.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert user into MongoDB
  await usersCollection.insertOne({ username, passwordHash, token: null });

  res.status(201).json({ message: 'User registered successfully' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user in MongoDB
  const user = await usersCollection.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate a session token
  const token = uuidv4();

  // Update user token in MongoDB
  await usersCollection.updateOne(
    { username },
    { $set: { token } }
  );

  // Store token in cookie
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Login successful' });
});

// Logout
app.post('/api/logout', async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    // Clear token in MongoDB
    await usersCollection.updateOne(
      { token },
      { $set: { token: null } }
    );
  }

  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// Restricted route
app.get('/api/secret', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await usersCollection.findOne({ token });
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json({ message: `Welcome, ${user.username}! This is a secret.` });
});

// Catch-all → return frontend index.html
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
