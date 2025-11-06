// service/index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());      // Parse JSON bodies
app.use(cookieParser());      // Parse cookies

const port = 4000;            // Default port

// In-memory storage (Step 1)
const users = []; // Stores registered users
const posts = []; // Stores posts

// Test endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Create a post
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

// Register a new user
app.post('/api/register', async (req, res) => {
  console.log('Register route hit!');
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  // Check if user exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { username, passwordHash, token: null };
  users.push(user);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login user
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate session token
  user.token = uuidv4();

  // Store token in a cookie
  res.cookie('token', user.token, { httpOnly: true });
  res.json({ message: 'Login successful' });
});

// Logout user
app.post('/api/logout', (req, res) => {
  const token = req.cookies.token;
  const user = users.find(u => u.token === token);
  if (user) {
    user.token = null;
  }
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// Restricted endpoint
app.get('/api/secret', (req, res) => {
  const token = req.cookies.token;
  const user = users.find(u => u.token === token);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ message: `Welcome, ${user.username}! This is a secret.` });
});


// Start server
app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
