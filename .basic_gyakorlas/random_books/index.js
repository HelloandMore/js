import Database from "better-sqlite3";
import fs from "fs";
import express from "express";
import csv from "csv-parser";

const db = new Database("books.db");
const app = express();
app.use(express.json());

// Create table if not exists
function initDb() {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT,
    year INTEGER,
    sold INTEGER
  )`,
  ).run();
}

// Import CSV data if table is empty
function importCsvIfNeeded() {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM books").get();
  if (row.cnt === 0) {
    const books = [];
    fs.createReadStream("data.csv")
      .pipe(csv())
      .on("data", (data) => {
        books.push({
          id: Number(data.id),
          title: data.title,
          author: data.author,
          year: Number(data.year),
          sold: Number(data.sold),
        });
      })
      .on("end", () => {
        const insert = db.prepare(
          "INSERT INTO books (id, title, author, year, sold) VALUES (?, ?, ?, ?, ?)",
        );
        const insertMany = db.transaction((books) => {
          for (const b of books) {
            insert.run(b.id, b.title, b.author, b.year, b.sold);
          }
        });
        insertMany(books);
        console.log("CSV import finished.");
      });
  }
}

initDb();
importCsvIfNeeded();

// GET /nepszeru/:db
app.get("/nepszeru/:db", (req, res) => {
  const dbSold = Number(req.params.db);
  const rows = db
    .prepare("SELECT title, author FROM books WHERE sold >= ?")
    .all(dbSold);
  res.json(rows);
});

// GET /szerzo
app.get("/szerzo", (req, res) => {
  const nev = req.query.nev;
  if (!nev) return res.status(400).json({ error: "Missing author name (nev)" });
  const rows = db
    .prepare("SELECT title, year, sold FROM books WHERE author = ?")
    .all(nev);
  res.json(rows);
});

// GET /regi/:ev
app.get("/regi/:ev", (req, res) => {
  const ev = Number(req.params.ev);
  const rows = db
    .prepare("SELECT title, year FROM books WHERE year < ?")
    .all(ev);
  res.json(rows);
});

// GET /top-szerzok/:db
app.get("/top-szerzok/:db", (req, res) => {
  const dbCount = Number(req.params.db);
  const rows = db
    .prepare(
      "SELECT author, COUNT(*) as count FROM books GROUP BY author HAVING count >= ?",
    )
    .all(dbCount);
  res.json(rows.map((r) => r.author));
});

// PUT /sales
app.put("/sales", (req, res) => {
  const { id, sold } = req.body;
  if (typeof id !== "number" || typeof sold !== "number") {
    return res.status(400).json({ error: "id and sold must be numbers" });
  }
  const info = db
    .prepare("UPDATE books SET sold = ? WHERE id = ?")
    .run(sold, id);
  if (info.changes === 0) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json({ success: true });
});

app.listen(3300, () => {
  console.log("API running on port 3300");
});
