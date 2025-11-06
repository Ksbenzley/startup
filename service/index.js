// service/index.js
import express from 'express';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

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

// Start server
app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
