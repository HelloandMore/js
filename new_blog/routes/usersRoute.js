import express from "express";
import db from "../data/db.js";
import bcrypt from "bcrypt";

const router = express.Router();
const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

// Users API
router.get("/", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required." });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const stmt = db.prepare(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
  );
  const result = stmt.run(name, email, hashedPassword);
  const newUser = { id: result.lastInsertRowid, name, email };
  res.status(201).json(newUser);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required." });
  }

  // Hash the password before updating it
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const stmt = db.prepare(
    "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?"
  );
  const result = stmt.run(name, email, hashedPassword, id);
  if (result.changes > 0) {
    const updatedUser = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    res.json(updatedUser);
  } else {
    res.status(404).send("User not found");
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  const result = stmt.run(id);
  if (result.changes > 0) {
    res.status(204).send();
  } else {
    res.status(404).send("User not found");
  }
});

export default router;
