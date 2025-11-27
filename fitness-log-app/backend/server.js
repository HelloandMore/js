import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Initialize database
const db = new Database(path.join(__dirname, "fitness.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    duration INTEGER NOT NULL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    reps INTEGER NOT NULL,
    sets INTEGER NOT NULL,
    weight REAL NOT NULL,
    FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
  );
`);

console.log("Database initialized");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// AUTH ROUTES
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)"
    );
    const result = stmt.run(email, hashedPassword);

    const token = jwt.sign({ userId: result.lastInsertRowid }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ token, userId: result.lastInsertRowid });
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// WORKOUT ROUTES
app.post("/api/workouts", authMiddleware, (req, res) => {
  try {
    const { date, duration, notes, exercises } = req.body;

    const stmt = db.prepare(
      "INSERT INTO workouts (user_id, date, duration, notes) VALUES (?, ?, ?, ?)"
    );
    const result = stmt.run(req.userId, date, duration, notes || "");

    if (exercises && exercises.length > 0) {
      const exerciseStmt = db.prepare(
        "INSERT INTO exercises (workout_id, name, reps, sets, weight) VALUES (?, ?, ?, ?, ?)"
      );
      for (const exercise of exercises) {
        exerciseStmt.run(
          result.lastInsertRowid,
          exercise.name,
          exercise.reps,
          exercise.sets,
          exercise.weight
        );
      }
    }

    res
      .status(201)
      .json({ id: result.lastInsertRowid, message: "Workout created" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/workouts", authMiddleware, (req, res) => {
  try {
    const workouts = db
      .prepare("SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC")
      .all(req.userId);

    const workoutsWithExercises = workouts.map((workout) => {
      const exercises = db
        .prepare("SELECT * FROM exercises WHERE workout_id = ?")
        .all(workout.id);
      return { ...workout, exercises };
    });

    res.json(workoutsWithExercises);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/workouts/:id", authMiddleware, (req, res) => {
  try {
    const workout = db
      .prepare("SELECT * FROM workouts WHERE id = ? AND user_id = ?")
      .get(req.params.id, req.userId);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const exercises = db
      .prepare("SELECT * FROM exercises WHERE workout_id = ?")
      .all(workout.id);

    res.json({ ...workout, exercises });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/workouts/:id", authMiddleware, (req, res) => {
  try {
    const { date, duration, notes, exercises } = req.body;

    const stmt = db.prepare(
      "UPDATE workouts SET date = ?, duration = ?, notes = ? WHERE id = ? AND user_id = ?"
    );
    const result = stmt.run(
      date,
      duration,
      notes || "",
      req.params.id,
      req.userId
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Workout not found" });
    }

    if (exercises) {
      db.prepare("DELETE FROM exercises WHERE workout_id = ?").run(
        req.params.id
      );

      const exerciseStmt = db.prepare(
        "INSERT INTO exercises (workout_id, name, reps, sets, weight) VALUES (?, ?, ?, ?, ?)"
      );
      for (const exercise of exercises) {
        exerciseStmt.run(
          req.params.id,
          exercise.name,
          exercise.reps,
          exercise.sets,
          exercise.weight
        );
      }
    }

    res.json({ message: "Workout updated" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/workouts/:id", authMiddleware, (req, res) => {
  try {
    const stmt = db.prepare(
      "DELETE FROM workouts WHERE id = ? AND user_id = ?"
    );
    const result = stmt.run(req.params.id, req.userId);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// STATISTICS ROUTE
app.get("/api/statistics", authMiddleware, (req, res) => {
  try {
    const totalWorkouts = db
      .prepare("SELECT COUNT(*) as count FROM workouts WHERE user_id = ?")
      .get(req.userId);

    const totalDuration = db
      .prepare("SELECT SUM(duration) as total FROM workouts WHERE user_id = ?")
      .get(req.userId);

    const weeklyStats = db
      .prepare(
        `
      SELECT date, SUM(duration) as duration 
      FROM workouts 
      WHERE user_id = ? AND date >= date('now', '-7 days')
      GROUP BY date 
      ORDER BY date
    `
      )
      .all(req.userId);

    res.json({
      totalWorkouts: totalWorkouts.count || 0,
      totalDuration: totalDuration.total || 0,
      weeklyStats,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
