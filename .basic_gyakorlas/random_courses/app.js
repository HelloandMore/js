import express from "express";
import db from "./data/db.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("SELECT * FROM `class-members` WHERE id = ?");
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
  const stmt = db.prepare("SELECT * FROM `class-members`");
  const students = stmt.all();
  res
    .status(200)
    .json(
      students
        .sort((a, b) => (a.lastname || "").localeCompare(b.lastname || ""))
        .sort((a, b) => (a.firstname || "").localeCompare(b.firstname || "")),
    );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
