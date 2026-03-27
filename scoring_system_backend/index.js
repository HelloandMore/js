import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import db from "./db.js";
import authRoutes from "./routes/auth.js";
import teamsRoutes from "./routes/teams.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
import invitationsRoutes from "./routes/invitations.js";
import scoresRoutes from "./routes/scores.js";
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/teams", teamsRoutes);

app.get("/", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
app.use("/invitations", invitationsRoutes);
app.use("/scores", scoresRoutes);

// seed a teacher user if none exists
try {
  const exists = db
    .prepare("SELECT id FROM users WHERE role = 'teacher' LIMIT 1")
    .get();
  if (!exists) {
    const hash = bcrypt.hashSync("teacherpass", 10);
    const info = db
      .prepare(
        "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      )
      .run("Teacher", "teacher@local", hash, "teacher");
    console.log(
      "Seeded teacher user id=",
      info.lastInsertRowid,
      "email=teacher@local password=teacherpass",
    );
  }
} catch (err) {
  // ignore if tables not created yet
}
