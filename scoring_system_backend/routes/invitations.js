import { Router } from "express";
import db from "../db.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

// Invite a user to a team
router.post("/teams/:teamId/invite", authRequired, (req, res) => {
  const { teamId } = req.params;
  const { to_user_id } = req.body;
  if (!to_user_id) return res.status(400).json({ error: "Missing to_user_id" });

  // ensure team exists
  const team = db.prepare("SELECT * FROM teams WHERE id = ?").get(teamId);
  if (!team) return res.status(404).json({ error: "Team not found" });

  // create invitation
  const stmt = db.prepare(
    "INSERT INTO invitations (team_id, from_user_id, to_user_id, status) VALUES (?, ?, ?, ?)",
  );
  const info = stmt.run(teamId, req.user.id, to_user_id, "pending");
  const invitation = db
    .prepare("SELECT * FROM invitations WHERE id = ?")
    .get(info.lastInsertRowid);
  res.json({ invitation });
});

// List invitations for current user
router.get("/", authRequired, (req, res) => {
  const inv = db
    .prepare(
      "SELECT i.*, t.name as team_name, u.name as from_name FROM invitations i JOIN teams t ON t.id = i.team_id JOIN users u ON u.id = i.from_user_id WHERE i.to_user_id = ? ORDER BY i.created_at DESC",
    )
    .all(req.user.id);
  res.json({ invitations: inv });
});

// Accept invitation
router.post("/:id/accept", authRequired, (req, res) => {
  const id = req.params.id;
  const invitation = db
    .prepare("SELECT * FROM invitations WHERE id = ?")
    .get(id);
  if (!invitation)
    return res.status(404).json({ error: "Invitation not found" });
  if (invitation.to_user_id !== req.user.id && req.user.role !== "teacher")
    return res.status(403).json({ error: "Forbidden" });
  if (invitation.status !== "pending")
    return res.status(400).json({ error: "Already responded" });

  // add member
  const add = db
    .prepare(
      "INSERT OR IGNORE INTO team_members (team_id, user_id) VALUES (?, ?)",
    )
    .run(invitation.team_id, invitation.to_user_id);
  db.prepare("UPDATE invitations SET status = ? WHERE id = ?").run(
    "accepted",
    id,
  );
  res.json({ accepted: true });
});

// Decline invitation
router.post("/:id/decline", authRequired, (req, res) => {
  const id = req.params.id;
  const invitation = db
    .prepare("SELECT * FROM invitations WHERE id = ?")
    .get(id);
  if (!invitation)
    return res.status(404).json({ error: "Invitation not found" });
  if (invitation.to_user_id !== req.user.id && req.user.role !== "teacher")
    return res.status(403).json({ error: "Forbidden" });
  if (invitation.status !== "pending")
    return res.status(400).json({ error: "Already responded" });

  db.prepare("UPDATE invitations SET status = ? WHERE id = ?").run(
    "declined",
    id,
  );
  res.json({ declined: true });
});

export default router;
