import express from 'express';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import http from 'http';
import { getUser, addUser, updateUser, userCollection, postsCollection } from './database.js';
import { peerProxy, broadcastMessage } from './peerProxy.js';

const app = express();
const authCookieName = 'token';
const PORT = process.env.PORT || 4000;

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());

// --- Serve static files ---
app.use(express.static('public'));

// --- API Router ---
const apiRouter = express.Router();
app.use('/api', apiRouter);

// --- POSTS ---
apiRouter.get('/posts', async (_req, res) => {
  const allPosts = await postsCollection.find().toArray();
  res.json(allPosts);
});

apiRouter.post('/posts', async (req, res) => {
  const { title, userName } = req.body;
  if (!title || !userName) return res.status(400).json({ error: 'Title and username required' });

  const newPost = {
    id: uuidv4(),
    title,
    userName,
    createdAt: new Date(),
  };

  await postsCollection.insertOne(newPost);

  // Broadcast via WebSocket
  broadcastMessage(JSON.stringify(newPost));

  res.status(201).json(newPost);
});

// --- USER AUTH ---
apiRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const existingUser = await getUser(username);
  if (existingUser) return res.status(400).json({ error: 'Username already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  await addUser({ username, passwordHash, token: null });

  res.status(201).json({ message: 'User registered successfully' });
});

apiRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);

  if (!user) return res.status(401).json({ error: 'Invalid username or password' });

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) return res.status(401).json({ error: 'Invalid username or password' });

  const token = uuidv4();
  await updateUser({ ...user, token });

  res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Login successful' });
});

apiRouter.post('/logout', async (req, res) => {
  const token = req.cookies[authCookieName];
  if (token) {
    const user = await userCollection.findOne({ token });
    if (user) await updateUser({ ...user, token: null });
  }
  res.clearCookie(authCookieName);
  res.json({ message: 'Logged out' });
});

// --- Catch-all frontend ---
app.use((_req, res) => res.sendFile('index.html', { root: 'public' }));

// --- Start HTTP + WebSocket server ---
const server = http.createServer(app);
peerProxy(server);

server.listen(PORT, () => console.log(`✅ HTTP + WS running on http://localhost:${PORT}`));
