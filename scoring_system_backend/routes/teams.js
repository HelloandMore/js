import { Router } from "express";
import db from "../db.js";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = Router();

// Create team (teachers or students can create, but teacher can set created_by)
router.post("/", authRequired, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  const stmt = db.prepare("INSERT INTO teams (name, created_by) VALUES (?, ?)");
  const info = stmt.run(name, req.user.id);
  const team = db
    .prepare("SELECT * FROM teams WHERE id = ?")
    .get(info.lastInsertRowid);
  res.json({ team });
});

router.get("/", authRequired, (req, res) => {
  const teams = db
    .prepare("SELECT * FROM teams ORDER BY created_at DESC")
    .all();
  res.json({ teams });
});

router.get("/:id", authRequired, (req, res) => {
  const team = db
    .prepare("SELECT * FROM teams WHERE id = ?")
    .get(req.params.id);
  if (!team) return res.status(404).json({ error: "Not found" });
  const members = db
    .prepare(
      "SELECT u.id, u.name, u.email FROM team_members tm JOIN users u ON u.id = tm.user_id WHERE tm.team_id = ?",
    )
    .all(req.params.id);
  res.json({ team, members });
});

router.delete("/:id", authRequired, requireRole("teacher"), (req, res) => {
  const info = db.prepare("DELETE FROM teams WHERE id = ?").run(req.params.id);
  res.json({ deleted: info.changes });
});

// Teacher can add a member directly
router.post(
  "/:id/members",
  authRequired,
  requireRole("teacher"),
  (req, res) => {
    const teamId = req.params.id;
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ error: "Missing user_id" });
    const team = db.prepare("SELECT * FROM teams WHERE id = ?").get(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });
    const user = db.prepare("SELECT id FROM users WHERE id = ?").get(user_id);
    if (!user) return res.status(404).json({ error: "User not found" });
    db.prepare(
      "INSERT OR IGNORE INTO team_members (team_id, user_id) VALUES (?, ?)",
    ).run(teamId, user_id);
    const members = db
      .prepare(
        "SELECT u.id, u.name, u.email FROM team_members tm JOIN users u ON u.id = tm.user_id WHERE tm.team_id = ?",
      )
      .all(teamId);
    res.json({ members });
  },
);

// Teacher can remove a member
router.delete(
  "/:id/members/:userId",
  authRequired,
  requireRole("teacher"),
  (req, res) => {
    const teamId = req.params.id;
    const userId = req.params.userId;
    const info = db
      .prepare("DELETE FROM team_members WHERE team_id = ? AND user_id = ?")
      .run(teamId, userId);
    res.json({ removed: info.changes });
  },
);

export default router;
