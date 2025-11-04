const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Serve static files when deployed
app.use(express.static('public'));

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Example endpoints
app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from your backend!' });
});

// Example protected route
app.get('/api/secure', (req, res) => {
  res.status(401).send({ error: 'You must log in first' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
