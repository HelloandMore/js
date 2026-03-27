import { Router } from "express";
import db from "../db.js";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = Router();

// Get score history and total for a team
router.get("/teams/:teamId/scores", authRequired, (req, res) => {
  const { teamId } = req.params;
  const history = db
    .prepare(
      "SELECT s.*, u.name as created_by_name FROM scores s LEFT JOIN users u ON u.id = s.created_by WHERE s.team_id = ? ORDER BY s.created_at DESC",
    )
    .all(teamId);
  const totalRow = db
    .prepare("SELECT SUM(value) as total FROM scores WHERE team_id = ?")
    .get(teamId);
  const total = totalRow ? totalRow.total || 0 : 0;
  res.json({ history, total });
});

// Add (delta) score entry
router.post("/teams/:teamId/scores", authRequired, (req, res) => {
  const { teamId } = req.params;
  const { value, reason } = req.body;
  if (typeof value !== "number")
    return res.status(400).json({ error: "Missing numeric value" });
  const stmt = db.prepare(
    "INSERT INTO scores (team_id, value, reason, created_by) VALUES (?, ?, ?, ?)",
  );
  const info = stmt.run(teamId, value, reason || null, req.user.id);
  const score = db
    .prepare("SELECT * FROM scores WHERE id = ?")
    .get(info.lastInsertRowid);
  res.json({ score });
});

// Set absolute team score (teacher-only)
router.put(
  "/teams/:teamId/score",
  authRequired,
  requireRole("teacher"),
  (req, res) => {
    const { teamId } = req.params;
    const { absolute, reason } = req.body;
    if (typeof absolute !== "number")
      return res.status(400).json({ error: "Missing numeric absolute value" });
    const totalRow = db
      .prepare("SELECT SUM(value) as total FROM scores WHERE team_id = ?")
      .get(teamId);
    const current = totalRow ? totalRow.total || 0 : 0;
    const delta = absolute - current;
    const stmt = db.prepare(
      "INSERT INTO scores (team_id, value, reason, created_by) VALUES (?, ?, ?, ?)",
    );
    const info = stmt.run(teamId, delta, reason || "Set absolute", req.user.id);
    const score = db
      .prepare("SELECT * FROM scores WHERE id = ?")
      .get(info.lastInsertRowid);
    res.json({ score, new_total: absolute });
  },
);

export default router;
