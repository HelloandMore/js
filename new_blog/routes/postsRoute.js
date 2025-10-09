import express from "express";
import db from "../data/db.js";

const router = express.Router();

// Posts API
router.get("/", (req, res) => {
  const posts = db.prepare("SELECT * FROM posts").all();
  res.json(posts);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send("Post not found");
  }
});

router.post("/", (req, res) => {
  const { title, content, userId } = req.body;

  // Validate required fields
  if (!title || !content || !userId) {
    return res
      .status(400)
      .json({ error: "Title, content, and userId are required." });
  }

  const stmt = db.prepare(
    "INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)"
  );
  const result = stmt.run(title, content, userId);
  const newPost = { id: result.lastInsertRowid, title, content, userId };
  res.status(201).json(newPost);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // Validate required fields
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required." });
  }

  const stmt = db.prepare(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?"
  );
  const result = stmt.run(title, content, id);
  if (result.changes > 0) {
    const updatedPost = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
    res.json(updatedPost);
  } else {
    res.status(404).send("Post not found");
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
  const result = stmt.run(id);
  if (result.changes > 0) {
    res.status(204).send();
  } else {
    res.status(404).send("Post not found");
  }
});

export default router;
