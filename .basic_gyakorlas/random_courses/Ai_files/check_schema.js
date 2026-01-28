import Database from "better-sqlite3";

const db = new Database("./data/database.db");

console.log("Schema for class-members:");
const schema = db
  .prepare("SELECT sql FROM sqlite_master WHERE name = 'class-members'")
  .get();
console.log(schema);

console.log("\nForeign keys enabled?");
const fkStatus = db.prepare("PRAGMA foreign_keys").get();
console.log(fkStatus);
