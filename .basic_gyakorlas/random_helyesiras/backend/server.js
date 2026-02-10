import express, { json, urlencoded } from "express";
import Database from "better-sqlite3";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Adatbázis kapcsolat állapota
let dbConnected = false;
let db;

// SQLite adatbázis inicializálása
const dbPath = path.join(__dirname, "szogyak.db");

try {
  db = new Database(dbPath);

  // Ellenőrizzük, hogy létezik-e a szavak tábla
  const tableExists = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='szavak'",
    )
    .get();

  if (!tableExists) {
    console.log("📋 Adatbázis inicializálása...");

    // Tábla létrehozása
    db.exec(`
      CREATE TABLE szavak (
        azon INTEGER PRIMARY KEY AUTOINCREMENT,
        szoto TEXT NOT NULL,
        szofaj TEXT NOT NULL,
        gyakori INTEGER NOT NULL
      );
      CREATE INDEX idx_szofaj ON szavak(szofaj);
      CREATE INDEX idx_szoto ON szavak(szoto);
      CREATE INDEX idx_gyakori ON szavak(gyakori);
    `);

    // Adatok importálása
    const filePath = path.join(__dirname, "..", "szo10000.txt");
    if (fs.existsSync(filePath)) {
      console.log("📥 Adatok importálása szo10000.txt fájlból...");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const sorok = fileContent.split("\n");

      const insert = db.prepare(
        "INSERT INTO szavak (azon, szoto, szofaj, gyakori) VALUES (?, ?, ?, ?)",
      );

      const insertMany = db.transaction((rows) => {
        for (const row of rows) {
          insert.run(row.azon, row.szoto, row.szofaj, row.gyakori);
        }
      });

      const adatok = [];
      for (let i = 1; i < sorok.length; i++) {
        const sor = sorok[i].trim();
        if (sor) {
          const mezok = sor.split("\t");
          if (mezok.length === 4) {
            adatok.push({
              azon: parseInt(mezok[0]),
              szoto: mezok[1],
              szofaj: mezok[2],
              gyakori: parseInt(mezok[3]),
            });
          }
        }
      }

      insertMany(adatok);
      console.log(`✅ ${adatok.length} sor importálva!`);
    } else {
      console.warn("⚠️  szo10000.txt fájl nem található!");
    }
  }

  dbConnected = true;
  console.log("✅ SQLite adatbázis sikeresen inicializálva!");
} catch (err) {
  console.error("\n❌ Adatbázis hiba:", err.message);
  console.log(
    "\n⚠️  A backend szerver fut, de az API végpontok nem működnek!\n",
  );
}

// Middleware az adatbázis ellenőrzéshez
const checkDb = (req, res, next) => {
  if (!dbConnected) {
    return res.status(503).json({
      error: "Adatbázis kapcsolat nem elérhető",
      message: "Az adatbázis nem inicializálható",
    });
  }
  next();
};

// Health check endpoint
app.get("/", (req, res) => {
  const stats = dbConnected
    ? {
        totalWords: db.prepare("SELECT COUNT(*) as count FROM szavak").get()
          .count,
        database: "SQLite (szogyak.db)",
      }
    : {
        totalWords: 0,
        database: "disconnected",
      };

  res.json({
    status: "Server is running",
    databaseType: "SQLite",
    databaseStatus: dbConnected ? "connected" : "disconnected",
    ...stats,
    endpoints: [
      "GET /elofordulas/:mennyiseg",
      "GET /melleknev?szoreszlet=...",
      "GET /szofajok",
      "GET /gyakorisag/:db",
      "PUT /modosit",
    ],
  });
});

// 2. GET /elofordulas/:mennyiseg - Igék előfordulása
app.get("/elofordulas/:mennyiseg", checkDb, (req, res) => {
  try {
    const mennyiseg = parseInt(req.params.mennyiseg);
    const stmt = db.prepare(
      "SELECT szoto FROM szavak WHERE szofaj = 'ige' AND gyakori >= ? ORDER BY gyakori DESC",
    );
    const results = stmt.all(mennyiseg);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET /melleknev - Melléknevek szórészlettel
app.get("/melleknev", checkDb, (req, res) => {
  try {
    const szoreszlet = req.query.szoreszlet || "";
    const stmt = db.prepare(
      "SELECT szoto, gyakori FROM szavak WHERE szofaj = 'mn' AND szoto LIKE ? ORDER BY szoto",
    );
    const results = stmt.all(szoreszlet + "%");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. GET /szofajok - Szófajok és szótövek száma
app.get("/szofajok", checkDb, (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT szofaj, COUNT(*) as darab FROM szavak GROUP BY szofaj ORDER BY szofaj",
    );
    const results = stmt.all();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. GET /gyakorisag/:db - Többször előforduló szótövek
app.get("/gyakorisag/:db", checkDb, (req, res) => {
  try {
    const db_param = parseInt(req.params.db);
    const stmt = db.prepare(`
      SELECT szoto, COUNT(*) as elofordulas 
      FROM szavak 
      GROUP BY szoto 
      HAVING COUNT(*) >= ? 
      ORDER BY elofordulas DESC, szoto
    `);
    const results = stmt.all(db_param);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. PUT /modosit - Gyakoriság módosítása
app.put("/modosit", checkDb, (req, res) => {
  try {
    const { szoto, szofaj, gyakori } = req.body;

    // Ellenőrzés: szófaj létezik-e
    const szofajCheck = db
      .prepare("SELECT COUNT(*) as darab FROM szavak WHERE szofaj = ?")
      .get(szofaj);

    if (szofajCheck.darab === 0) {
      return res.status(400).json({ error: "Hibás szófaj" });
    }

    // Ellenőrzés: szótő létezik-e
    const szotoCheck = db
      .prepare("SELECT gyakori FROM szavak WHERE szoto = ? AND szofaj = ?")
      .get(szoto, szofaj);

    if (!szotoCheck) {
      // Új szótő beszúrása
      if (gyakori < 10000) {
        return res.status(400).json({ error: "Nem megfelelő mennyiség." });
      }

      const insert = db.prepare(
        "INSERT INTO szavak (szoto, szofaj, gyakori) VALUES (?, ?, ?)",
      );
      const result = insert.run(szoto, szofaj, gyakori);
      res.json({ message: "Sikeres beszúrás", id: result.lastInsertRowid });
    } else {
      // Meglévő szótő módosítása
      const regi_gyakori = szotoCheck.gyakori;

      if (gyakori < 10000 || gyakori < regi_gyakori) {
        return res.status(400).json({ error: "Nem megfelelő mennyiség." });
      }

      const update = db.prepare(
        "UPDATE szavak SET gyakori = ? WHERE szoto = ? AND szofaj = ?",
      );
      const result = update.run(gyakori, szoto, szofaj);
      res.json({
        message: "Sikeres módosítás",
        affectedRows: result.changes,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Szerver indítása
app.listen(PORT, () => {
  console.log("\n" + "=".repeat(50));
  console.log(`✅ A szerver fut a http://localhost:${PORT} címen`);
  console.log("=".repeat(50));
  console.log(`\n💾 Adatbázis: SQLite (${dbPath})`);
  if (dbConnected) {
    const count = db
      .prepare("SELECT COUNT(*) as count FROM szavak")
      .get().count;
    console.log(`📊 Rekordok száma: ${count}`);
  }
  console.log("\n📡 Elérhető végpontok:");
  console.log("   - GET  /                           (Health check)");
  console.log("   - GET  /elofordulas/:mennyiseg     (Igék szűrése)");
  console.log("   - GET  /melleknev?szoreszlet=...   (Melléknevek)");
  console.log("   - GET  /szofajok                   (Statisztika)");
  console.log("   - GET  /gyakorisag/:db             (Többszörös előfordulás)");
  console.log("   - PUT  /modosit                    (Gyakoriság módosítás)");
  console.log("\n" + "=".repeat(50) + "\n");
});
