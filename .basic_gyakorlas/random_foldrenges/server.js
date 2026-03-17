import express, { json } from "express";
import db from "./db.js";

const app = express();
app.use(express.json());

// 1. GET /rengesek/telepulesek/:varmegye
// Ábécérendben adja meg az adott vármegye települései nevét
app.get("/rengesek/telepulesek/:varmegye", (req, res) => {
  const { varmegye } = req.params;
  const rows = db
    .prepare("SELECT nev FROM telepules WHERE varmegye = ? ORDER BY nev ASC")
    .all(varmegye);
  res.status(200).json(rows.map((r) => r.nev));
});

// 2. GET /rengesek/varmegye/statisztika
// Vármegyénként a feljegyzett földrengések száma, csökkenő sorrendben
app.get("/rengesek/varmegye/statisztika", (req, res) => {
  const rows = db
    .prepare(
      `SELECT t.varmegye, COUNT(*) AS db
       FROM naplo n
       JOIN telepules t ON n.telepid = t.id
       GROUP BY t.varmegye
       ORDER BY db DESC`,
    )
    .all();
  res.status(200).json(rows);
});

// 3. GET /rengesek/intenzitas
// Top 3 év, amikor a legtöbb 3,0-nál nagyobb intenzitású földrengés volt
app.get("/rengesek/intenzitas", (req, res) => {
  const rows = db
    .prepare(
      `SELECT substr(datum, 1, 4) AS ev, COUNT(*) AS db
       FROM naplo
       WHERE intenzitas > 3.0
       GROUP BY substr(datum, 1, 4)
       ORDER BY db DESC
       LIMIT 3`,
    )
    .all();
  res.status(200).json(rows);
});

// 4. POST /rengesek/uj
// Új földrengés rögzítése
app.post("/rengesek/uj", (req, res) => {
  const { datum, ido, telepules, varmegye, magnitudo, intenzitas } = req.body;

  if (
    !datum ||
    !ido ||
    !telepules ||
    !varmegye ||
    magnitudo == null ||
    intenzitas == null
  ) {
    return res.status(400).json({ message: "Hiányzó adatok." });
  }

  // Dátum konverzió: "2026.03.12." → "2026.03.12"
  const datumClean = datum.replace(/\.$/, "");

  // Meglévő település keresése
  const existing = db
    .prepare("SELECT id FROM telepules WHERE nev = ? AND varmegye = ?")
    .get(telepules, varmegye);

  let telepid;
  if (existing) {
    telepid = existing.id;
  } else {
    const inserted = db
      .prepare("INSERT INTO telepules (nev, varmegye) VALUES (?, ?)")
      .run(telepules, varmegye);
    telepid = inserted.lastInsertRowid;
  }

  const result = db
    .prepare(
      "INSERT INTO naplo (datum, ido, telepid, magnitudo, intenzitas) VALUES (?, ?, ?, ?, ?)",
    )
    .run(datumClean, ido, telepid, magnitudo, intenzitas);

  res.status(201).json({
    message: "Földrengés sikeresen rögzítve",
    id: result.lastInsertRowid,
  });
});

app.listen(3000, () => console.log("Szerver fut: http://localhost:3000"));
