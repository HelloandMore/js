import Database from "better-sqlite3";

const db = new Database("./data/database.db");

try {
  // Test inserting a new subject
  console.log("Testing subject insert...");
  const insertSubject = db.prepare("INSERT INTO subjects (name) VALUES (?)");
  const subjectResult = insertSubject.run("TestSubject2");
  console.log("Subject inserted:", subjectResult.lastInsertRowid);

  // Test inserting a new student
  console.log("\nTesting student insert...");
  const insertStudent = db.prepare(
    "INSERT INTO students (firstname, lastname, classes) VALUES (?, ?, ?)",
  );
  const studentResult = insertStudent.run("TestFirst", "TestLast", "12A");
  console.log("Student inserted:", studentResult.lastInsertRowid);

  // Test inserting enrollment
  console.log("\nTesting enrollment insert...");
  const insertEnrollment = db.prepare(
    "INSERT INTO [class-members] (student_id, subject_id) VALUES (?, ?)",
  );
  const enrollResult = insertEnrollment.run(
    studentResult.lastInsertRowid,
    subjectResult.lastInsertRowid,
  );
  console.log("Enrollment inserted:", enrollResult.lastInsertRowid);

  console.log("\nAll operations successful!");
} catch (error) {
  console.error("Error occurred:");
  console.error(error);
}
