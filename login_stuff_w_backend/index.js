import express from "express";
import bcrypt from "bcrypt";
import sqlite3 from "sqlite3";
import path from "path";
const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email és jelszó megadása kötelező!",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Érvénytelen email formátum!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "A jelszónak legalább 6 karakter hosszúnak kell lennie!",
      });
    }

    db.get(
      "SELECT email FROM users WHERE email = ?",
      [email.toLowerCase()],
      async (err, row) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({
            success: false,
            message: "Adatbázis hiba történt!",
          });
        }

        if (row) {
          return res.status(409).json({
            success: false,
            message: "Ez az email cím már regisztrálva van! Próbálj meg bejelentkezni.",
          });
        }

        try {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);

          db.run(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email.toLowerCase(), hashedPassword],
            function (err) {
              if (err) {
                console.error("Database error:", err);
                return res.status(500).json({
                  success: false,
                  message: "Felhasználó létrehozása sikertelen!",
                });
              }

              res.status(201).json({
                success: true,
                message: "Regisztráció sikeres! Most bejelentkezhetsz.",
                user: { id: this.lastID, email: email.toLowerCase() },
              });
            }
          );
        } catch (hashError) {
          console.error("Password hashing error:", hashError);
          res.status(500).json({
            success: false,
            message: "Szerver hiba történt!",
          });
        }
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Szerver hiba történt!",
    });
  }
});

app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email és jelszó megadása kötelező!",
      });
    }

    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email.toLowerCase()],
      async (err, user) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({
            success: false,
            message: "Adatbázis hiba történt!",
          });
        }

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Hibás email vagy jelszó!",
          });
        }

        try {
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            return res.status(401).json({
              success: false,
              message: "Hibás email vagy jelszó!",
            });
          }

          res.json({
            success: true,
            message: "Bejelentkezés sikeres!",
            user: { id: user.id, email: user.email },
          });
        } catch (compareError) {
          console.error("Password comparison error:", compareError);
          res.status(500).json({
            success: false,
            message: "Szerver hiba történt!",
          });
        }
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Szerver hiba történt!",
    });
  }
});

app.get("/api/users", (req, res) => {
  db.all("SELECT id, email, created_at FROM users", [], (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        message: "Adatbázis hiba történt!",
      });
    }
    res.json({ success: true, users: rows });
  });
});

process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
