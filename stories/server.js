import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";
import path from "path";

const app = express();
app.use(express.json());

// Serve static files (frontend)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// Initialize SQLite database
const db = new sqlite3.Database("./database.sqlite");

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        userId INTEGER,
        FOREIGN KEY(userId) REFERENCES users(id)
    )`);
});

// Registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
  if (existingUser) return res.status(400).send("Email already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);
  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    function (err) {
      if (err) return res.status(500).send("Error registering user.");
      res.status(201).json({ id: this.lastID, name, email });
    }
  );
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid email or password.");
  }
  const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
  res.json({ token });
});

// Get current user profile
app.get("/users/me", (req, res) => {
  const userId = 1; // Placeholder for authenticated user ID
  db.get("SELECT * FROM users WHERE id = ?", [userId], (err, user) => {
    if (err || !user) return res.status(404).send("User not found.");
    res.json({ id: user.id, name: user.name, email: user.email });
  });
});

// Create post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  const userId = 1; // Placeholder for authenticated user ID
  db.run(
    "INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)",
    [title, content, userId],
    function (err) {
      if (err) return res.status(500).send("Error creating post.");
      res.status(201).json({ id: this.lastID, title, content, userId });
    }
  );
});

// Get all posts
app.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    if (err) return res.status(500).send("Error fetching posts.");
    res.json(rows);
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
