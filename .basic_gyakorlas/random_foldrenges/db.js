import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new Database(join(__dirname, "renges.db"));
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS telepules (
    id      INTEGER PRIMARY KEY,
    nev     TEXT NOT NULL,
    varmegye TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS naplo (
    id         INTEGER PRIMARY KEY,
    datum      TEXT NOT NULL,
    ido        TEXT NOT NULL,
    telepid    INTEGER NOT NULL,
    magnitudo  REAL,
    intenzitas REAL,
    FOREIGN KEY (telepid) REFERENCES telepules(id)
  );
`);

const { cnt } = db.prepare("SELECT COUNT(*) AS cnt FROM telepules").get();

if (cnt === 0) {
  const parseCSV = (filename) =>
    readFileSync(join(__dirname, filename), "utf8")
      .split(/\r?\n/)
      .slice(1)
      .filter(Boolean);

  const insertTelepules = db.prepare(
    "INSERT INTO telepules (id, nev, varmegye) VALUES (?, ?, ?)",
  );
  db.transaction(() => {
    for (const line of parseCSV("telepules.csv")) {
      const [id, nev, varmegye] = line.split(",");
      insertTelepules.run(Number(id), nev, varmegye);
    }
  })();

  const insertNaplo = db.prepare(
    "INSERT INTO naplo (id, datum, ido, telepid, magnitudo, intenzitas) VALUES (?, ?, ?, ?, ?, ?)",
  );
  db.transaction(() => {
    for (const line of parseCSV("naplo.csv")) {
      const [id, datum, ido, telepid, magnitudo, intenzitas] = line.split(",");
      insertNaplo.run(
        Number(id),
        datum,
        ido,
        Number(telepid),
        magnitudo === "" ? null : Number(magnitudo),
        intenzitas === "" ? null : Number(intenzitas),
      );
    }
  })();

  console.log("Adatbázis feltöltve a CSV fájlokból.");
}

export default db;
