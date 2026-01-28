import Database from "better-sqlite3";

const db = new Database("./data/database.db");

try {
  console.log("Test INSERT with square brackets");
  const stmt = db.prepare(
    "INSERT INTO [class-members] (student_id, subject_id) VALUES (?, ?)",
  );
  console.log("Prepared statement created successfully");
  const result = stmt.run(1, 1); // student 1, subject 1 (probably already exists, that's ok)
  console.log("Insert result:", result);
} catch (error) {
  console.error("Error message:", error.message);
  console.error("Error code:", error.code);
  console.error("Full error:", error);
}
