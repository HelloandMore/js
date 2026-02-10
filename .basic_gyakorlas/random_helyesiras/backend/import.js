import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importDatabase() {
  try {
    const dbPath = path.join(__dirname, "szogyak.db");

    console.log("=== Szógyakoriság SQLite adatbázis importáló ===\n");
    console.log(`📁 Adatbázis helye: ${dbPath}\n`);

    // Ha már létezik az adatbázis, töröljük
    if (fs.existsSync(dbPath)) {
      console.log("⚠️  Meglévő adatbázis törlése...");
      fs.unlinkSync(dbPath);
    }

    // Új adatbázis létrehozása
    console.log("📋 Új adatbázis létrehozása...");
    const db = new Database(dbPath);

    // Tábla létrehozása
    console.log("📊 Tábla létrehozása...");
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

    // Adatok beolvasása a fájlból
    const filePath = path.join(__dirname, "..", "szo10000.txt");
    console.log("📥 Adatok beolvasása szo10000.txt fájlból...");

    if (!fs.existsSync(filePath)) {
      throw new Error("A szo10000.txt fájl nem található!");
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const sorok = fileContent.split("\n");

    // Prepared statement létrehozása
    const insert = db.prepare(
      "INSERT INTO szavak (azon, szoto, szofaj, gyakori) VALUES (?, ?, ?, ?)",
    );

    // Transaction használata a gyorsaságért
    const insertMany = db.transaction((rows) => {
      for (const row of rows) {
        insert.run(row.azon, row.szoto, row.szofaj, row.gyakori);
      }
    });

    // Adatok összegyűjtése
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

      if (i % 500 === 0) {
        console.log(`   Beolvasva: ${i}/${sorok.length} sor...`);
      }
    }

    // Transaction végrehajtása
    console.log("💾 Adatok mentése az adatbázisba...");
    insertMany(adatok);

    console.log(
      `\n✅ Sikeres importálás! Összesen ${adatok.length} sor került be az adatbázisba.`,
    );

    // Statisztika lekérdezése
    const stats = db
      .prepare(
        "SELECT szofaj, COUNT(*) as darab FROM szavak GROUP BY szofaj ORDER BY szofaj",
      )
      .all();

    console.log("\n📊 Statisztika szófajonként:");
    stats.forEach((row) => {
      console.log(`   ${row.szofaj}: ${row.darab} szó`);
    });

    console.log("\n" + "=".repeat(50));
    console.log("✅ Import befejezve!");
    console.log("=".repeat(50));
    console.log("\n💡 Most már futtathatod a backend szervert:");
    console.log("   npm run backend\n");

    db.close();
  } catch (error) {
    console.error("\n❌ Hiba történt:", error.message);
    process.exit(1);
  }
}

// Futtatás
importDatabase();
