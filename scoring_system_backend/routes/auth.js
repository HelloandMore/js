import { Router } from "express";
import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../middleware/auth.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing fields" });

  const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (exists)
    return res.status(400).json({ error: "Email already registered" });

  const hash = await bcrypt.hash(password, 10);
  const stmt = db.prepare(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
  );
  const info = stmt.run(name, email, hash, "student");
  const user = { id: info.lastInsertRowid, name, email, role: "student" };
  res.json({ user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });

  const user = db
    .prepare(
      "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
    )
    .get(email);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

router.get("/me", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.json({ user: null });
  try {
    const parts = auth.split(" ");
    if (parts.length !== 2) return res.json({ user: null });
    const payload = jwt.verify(parts[1], JWT_SECRET);
    const user = db
      .prepare("SELECT id, name, email, role FROM users WHERE id = ?")
      .get(payload.id);
    res.json({ user });
  } catch (err) {
    res.json({ user: null });
  }
});

export default router;
