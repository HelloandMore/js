import Database from "better-sqlite3";

const db = new Database("./data/database.db");

try {
  // Get all existing enrollments
  console.log("Backing up existing class-members data...");
  const existingData = db.prepare('SELECT * FROM "class-members"').all();
  console.log(`Found ${existingData.length} existing enrollments`);

  // Drop the old table
  console.log("\nDropping old class-members table...");
  db.prepare('DROP TABLE "class-members"').run();

  // Create new table with correct foreign key
  console.log("Creating new class-members table with correct schema...");
  db.prepare(
    `
    CREATE TABLE "class-members"(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      subject_id INTEGER NOT NULL, 
      student_id INTEGER NOT NULL,
      FOREIGN KEY (subject_id) REFERENCES subjects(id),
      FOREIGN KEY (student_id) REFERENCES students(id)
    )
  `,
  ).run();

  // Restore the data
  console.log("\nRestoring data...");
  const insertStmt = db.prepare(
    'INSERT INTO "class-members" (id, student_id, subject_id) VALUES (?, ?, ?)',
  );
  for (const row of existingData) {
    insertStmt.run(row.id, row.student_id, row.subject_id);
  }

  console.log(
    `\nSuccessfully recreated table and restored ${existingData.length} records!`,
  );
} catch (error) {
  console.error("Error:", error);
}
