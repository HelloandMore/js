import Database from "better-sqlite3";

const db = new Database("./data/database.db");

console.log("Tables:");
const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table'")
  .all();
console.log(tables);

console.log("\nClass-members schema:");
const schema = db.prepare("PRAGMA table_info('class-members')").all();
console.log(schema);

console.log("\nSample class-members data:");
const data = db.prepare("SELECT * FROM 'class-members' LIMIT 5").all();
console.log(data);
