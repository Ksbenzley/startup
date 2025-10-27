import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ---- Temporary "database" ----
const users = {}; // { username: { password: '1234', posts: [] } }

// ---- ROUTES ----

// Root route (to test connection)
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

// Login or register a user
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (!users[username]) {
    // Register new user
    users[username] = { password, posts: [] };
    return res.status(201).json({ message: "User created", username });
  }

  // Login check
  if (users[username].password === password) {
    res.json({ message: "Login successful", username });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
});

// Get all posts for a specific user
app.get("/api/posts/:username", (req, res) => {
  const { username } = req.params;

  if (!users[username]) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(users[username].posts);
});

// Add a post for a user
app.post("/api/posts/:username", (req, res) => {
  const { username } = req.params;
  const { title, description } = req.body;

  if (!users[username]) {
    return res.status(404).json({ message: "User not found" });
  }

  const newPost = { title, description, createdAt: new Date() };
  users[username].posts.push(newPost);

  res.status(201).json(newPost);
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
