import express from "express";
import Database from "better-sqlite3";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

// ── Database initialisation ────────────────────────────────────────────────
const DB_PATH = join(__dirname, "kozvetito.db");
const SQL_PATH = join(__dirname, "kozvetito-sqlite.sql");

let db;
if (!fs.existsSync(DB_PATH)) {
  console.log("Creating database from SQL file…");
  db = new Database(DB_PATH);
  // Disable FK constraints during bulk import (INSERT order may not match FK deps)
  db.pragma("foreign_keys = OFF");
  // Strip the PRAGMA foreign_keys = ON; from the SQL so it doesn't re-enable during exec
  const rawSql = fs.readFileSync(SQL_PATH, "utf8");
  const sql = rawSql.replace(/PRAGMA\s+foreign_keys\s*=\s*ON\s*;/gi, "");
  db.exec(sql);
  db.pragma("foreign_keys = ON");
  console.log("Database created successfully.");
} else {
  db = new Database(DB_PATH);
  console.log("Database loaded.");
}

// ── helper: full address expression ──────────────────────────────────────
const CIM = `(i.kozterulet || ' ' || i.hazszam)`;

// ── 1. GET /nagy/:terulet ──────────────────────────────────────────────────
// Returns properties whose total room area (SUM hossz*szel) >= given value.
// Response: [{ cim, terulet, ar }, …]
// - terulet: sum of room areas from helyiseg
// - ar: latest price from hirdetes
app.get("/nagy/:terulet", (req, res) => {
  const terulet = parseFloat(req.params.terulet);
  if (isNaN(terulet)) {
    return res.status(400).json({ message: "Érvénytelen területérték." });
  }

  const rows = db
    .prepare(
      `SELECT ${CIM} AS cim,
              ROUND(SUM(he.hossz * he.szel), 2) AS terulet,
              (SELECT h2.ar
               FROM hirdetes h2
               WHERE h2.ingatlanid = i.id
               ORDER BY h2.datum DESC, h2.id DESC
               LIMIT 1) AS ar
       FROM ingatlan i
       JOIN helyiseg he ON he.ingatlanid = i.id
       GROUP BY i.id
       HAVING terulet >= ?`,
    )
    .all(terulet);

  res.json(rows);
});

// ── 2. GET /aktivhirdetes ──────────────────────────────────────────────────
// Returns property address and ad date for active ads (allapot != 'eladva').
app.get("/aktivhirdetes", (req, res) => {
  const rows = db
    .prepare(
      `SELECT ${CIM} AS cim, h.datum
       FROM hirdetes h
       JOIN ingatlan i ON i.id = h.ingatlanid
       WHERE h.allapot != 'eladva'`,
    )
    .all();

  res.json(rows);
});

// ── 3. GET /szobaszam/:darab ───────────────────────────────────────────────
// Returns property addresses that have at least :darab rooms.
app.get("/szobaszam/:darab", (req, res) => {
  const darab = parseInt(req.params.darab, 10);
  if (isNaN(darab)) {
    return res.status(400).json({ message: "Érvénytelen szobaszám." });
  }

  const rows = db
    .prepare(
      `SELECT ${CIM} AS cim
       FROM ingatlan i
       JOIN helyiseg h ON h.ingatlanid = i.id
       GROUP BY i.id
       HAVING COUNT(h.id) >= ?`,
    )
    .all(darab);

  res.json(rows);
});

// ── 4. PUT /aratmodosit ───────────────────────────────────────────────────
// Modifies an ingatlan's price.
// Body: { id, ar }
app.put("/aratmodosit", (req, res) => {
  const { id, ar } = req.body;

  if (ar === undefined || ar === null) {
    return res.status(400).json({ message: "Nem megfelelő ár" });
  }

  if (ar < 1_000_000) {
    return res.status(400).json({ message: "Túl alacsony ár" });
  }

  const ingatlan = db.prepare("SELECT id FROM ingatlan WHERE id = ?").get(id);

  if (!ingatlan) {
    return res.status(404).json({ message: "Nincs ilyen ingatlan" });
  }

  // Price stored in millions of HUF; insert a new 'módosítva' record
  const arMillio = ar / 1_000_000;
  const today = new Date().toISOString().split("T")[0];

  db.prepare(
    "INSERT INTO hirdetes (ingatlanid, ar, allapot, datum) VALUES (?, ?, 'módosítva', ?)",
  ).run(id, arMillio, today);

  res.json({ message: "Az ár sikeresen módosítva." });
});

// ── 5. POST /ujhelyiseg ───────────────────────────────────────────────────
// Adds a new room record.
// Body: { ingatlanid, hossz, szel, funkcio }
app.post("/ujhelyiseg", (req, res) => {
  const { ingatlanid, hossz, szel, funkcio } = req.body;

  // Required fields check
  if (
    ingatlanid === undefined ||
    hossz === undefined ||
    szel === undefined ||
    funkcio === undefined
  ) {
    return res.status(400).json({ message: "Hiányzó adatok." });
  }

  // Ingatlan existence check
  const ingatlan = db
    .prepare("SELECT id FROM ingatlan WHERE id = ?")
    .get(ingatlanid);

  if (!ingatlan) {
    return res.status(404).json({ message: "Nincs ilyen ingatlan." });
  }

  // Size validation: each dimension must be between 1.0 and 20.0 metres
  if (hossz < 1.0 || hossz > 20.0 || szel < 1.0 || szel > 20.0) {
    return res.status(400).json({ message: "Érvénytelen méret." });
  }

  // Area check: new room area must not exceed the property's total existing area
  const totalAreaRow = db
    .prepare(
      "SELECT COALESCE(SUM(hossz * szel), 0) AS ossz FROM helyiseg WHERE ingatlanid = ?",
    )
    .get(ingatlanid);

  const newRoomArea = hossz * szel;
  if (newRoomArea > totalAreaRow.ossz) {
    return res
      .status(400)
      .json({ message: "A helyiség túl nagy az ingatlanhoz képest." });
  }

  const result = db
    .prepare(
      "INSERT INTO helyiseg (ingatlanid, hossz, szel, funkcio) VALUES (?, ?, ?, ?)",
    )
    .run(ingatlanid, hossz, szel, funkcio);

  res.status(201).json({
    message: "Helyiség sikeresen rögzítve",
    id: result.lastInsertRowid,
  });
});

// ── Start server ──────────────────────────────────────────────────────────
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Ingatlaniroda server running on http://localhost:${PORT}`);
});
