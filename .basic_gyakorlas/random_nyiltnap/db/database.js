import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize SQLite database in the db folder
const db = new Database(join(__dirname, "nyiltnap.db"));

// Parse CSV and import data
function parseCSV(filename) {
  const csvPath = join(__dirname, "..", filename);
  const content = readFileSync(csvPath, "utf-8");
  const lines = content.trim().split(/\r?\n/);
  const headers = lines[0].split(",").map((h) => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue; // Skip empty lines
    const values = lines[i].split(",").map((v) => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    data.push(row);
  }

  return data;
}

// Create tables with foreign key constraints
function initDatabase() {
  db.exec("PRAGMA foreign_keys = ON;");

  // Drop tables if they exist (for clean initialization)
  db.exec(`
    DROP TABLE IF EXISTS kapcsolat;
    DROP TABLE IF EXISTS orak;
    DROP TABLE IF EXISTS diakok;
  `);

  // Create diakok table
  db.exec(`
    CREATE TABLE IF NOT EXISTS diakok (
      id INTEGER PRIMARY KEY,
      nev TEXT NOT NULL,
      email TEXT NOT NULL,
      telefon TEXT NOT NULL,
      telepules TEXT NOT NULL
    )
  `);

  // Create orak table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orak (
      id INTEGER PRIMARY KEY,
      datum TEXT NOT NULL,
      targy TEXT NOT NULL,
      csoport TEXT NOT NULL,
      terem TEXT NOT NULL,
      tanar TEXT NOT NULL,
      ferohely INTEGER NOT NULL,
      orasorszam INTEGER NOT NULL
    )
  `);

  // Create kapcsolat table with foreign keys
  db.exec(`
    CREATE TABLE IF NOT EXISTS kapcsolat (
      id INTEGER PRIMARY KEY,
      diakid INTEGER NOT NULL,
      oraid INTEGER NOT NULL,
      FOREIGN KEY (diakid) REFERENCES diakok(id),
      FOREIGN KEY (oraid) REFERENCES orak(id)
    )
  `);

  console.log("Database tables created successfully.");
}

// Import data from CSV files
function importData() {
  // Import diakok
  const diakok = parseCSV("diakok.csv");
  const insertDiak = db.prepare(
    "INSERT INTO diakok (id, nev, email, telefon, telepules) VALUES (?, ?, ?, ?, ?)",
  );
  for (const diak of diakok) {
    insertDiak.run(diak.id, diak.nev, diak.email, diak.telefon, diak.telepules);
  }
  console.log(`Imported ${diakok.length} students.`);

  // Import orak
  const orak = parseCSV("orak.csv");
  const insertOra = db.prepare(
    "INSERT INTO orak (id, datum, targy, csoport, terem, tanar, ferohely, orasorszam) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  );
  for (const ora of orak) {
    insertOra.run(
      ora.id,
      ora.datum,
      ora.targy,
      ora.csoport,
      ora.terem,
      ora.tanar,
      ora.ferohely,
      ora.orasorszam,
    );
  }
  console.log(`Imported ${orak.length} lessons.`);

  // Import kapcsolat
  const kapcsolat = parseCSV("kapcsolat.csv");
  const insertKapcsolat = db.prepare(
    "INSERT INTO kapcsolat (id, diakid, oraid) VALUES (?, ?, ?)",
  );
  for (const k of kapcsolat) {
    insertKapcsolat.run(k.id, k.diakid, k.oraid);
  }
  console.log(`Imported ${kapcsolat.length} connections.`);
}

// Initialize database and import data
export function setupDatabase() {
  initDatabase();
  importData();
}

// Export the database instance
export default db;
