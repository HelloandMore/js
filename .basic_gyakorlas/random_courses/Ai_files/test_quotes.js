import Database from "better-sqlite3";

const db = new Database("./data/database.db");

try {
  console.log("Test 1: SELECT with square brackets");
  const test1 = db.prepare("SELECT * FROM [class-members] LIMIT 1");
  console.log(test1.get());

  console.log("\nTest 2: SELECT with double quotes");
  const test2 = db.prepare('SELECT * FROM "class-members" LIMIT 1');
  console.log(test2.get());

  console.log("\nTest 3: SELECT with backticks");
  const test3 = db.prepare("SELECT * FROM `class-members` LIMIT 1");
  console.log(test3.get());
} catch (error) {
  console.error("Error:", error.message);
  console.error("Full error:", error);
}
