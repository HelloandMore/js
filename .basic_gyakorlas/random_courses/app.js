import express from "express";
import db from "./data/db.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("SELECT * FROM `students` WHERE id = ?");
  const student = stmt.get(id);
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

app.get("/subjects", (req, res) => {
  const stmt = db.prepare("SELECT * FROM subjects");
  const subjects = stmt.all();
  res.status(200).json(subjects.sort((a, b) => a.name.localeCompare(b.name)));
});

app.get("/students", (req, res) => {
  const stmt = db.prepare("SELECT * FROM `students`");
  const students = stmt.all();
  res
    .status(200)
    .json(
      students
        .sort((a, b) => (a.lastname || "").localeCompare(b.lastname || ""))
        .sort((a, b) => (a.firstname || "").localeCompare(b.firstname || "")),
    );
});

app.post("/courses", (req, res) => {
  const { firstname, lastname, class: classname, subject } = req.body;

  // Validate that all required fields are present
  if (!firstname || !lastname || !classname || !subject) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    // Check if subject exists, if not create it
    let subjectRecord = db
      .prepare("SELECT * FROM subjects WHERE name = ?")
      .get(subject);

    if (!subjectRecord) {
      const insertSubject = db.prepare(
        "INSERT INTO subjects (name) VALUES (?)",
      );
      const subjectResult = insertSubject.run(subject);
      subjectRecord = {
        id: subjectResult.lastInsertRowid,
        name: subject,
      };
    }

    // Check if student exists, if not create them
    let studentRecord = db
      .prepare(
        "SELECT * FROM students WHERE firstname = ? AND lastname = ? AND classes = ?",
      )
      .get(firstname, lastname, classname);

    if (!studentRecord) {
      const insertStudent = db.prepare(
        "INSERT INTO students (firstname, lastname, classes) VALUES (?, ?, ?)",
      );
      const studentResult = insertStudent.run(firstname, lastname, classname);
      studentRecord = {
        id: studentResult.lastInsertRowid,
        firstname,
        lastname,
        classes: classname,
      };
    }

    // Check if student is already enrolled in the subject
    const enrollment = db
      .prepare(
        "SELECT * FROM [class-members] WHERE student_id = ? AND subject_id = ?",
      )
      .get(studentRecord.id, subjectRecord.id);

    if (enrollment) {
      return res.status(400).json({
        error: `${firstname} ${lastname} already study ${subject}.`,
      });
    }

    // Enroll the student in the subject
    const insertEnrollment = db.prepare(
      "INSERT INTO [class-members] (student_id, subject_id) VALUES (?, ?)",
    );
    insertEnrollment.run(studentRecord.id, subjectRecord.id);

    res.status(201).json({
      message: `${firstname} ${lastname} from ${classname} study ${subject}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create course" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
