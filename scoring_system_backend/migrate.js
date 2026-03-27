import { existsSync, mkdirSync, readFileSync } from "fs";
import { join, dirname } from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, "data", "database.db");
const dbDir = dirname(dbPath);
if (!existsSync(dbDir)) mkdirSync(dbDir, { recursive: true });

const sql = readFileSync(join(__dirname, "migrations", "init.sql"), "utf8");
const db = new Database(dbPath);

db.exec("PRAGMA foreign_keys = ON;");
db.exec(sql);

console.log("Migration applied.");
