import express from "express";
import * as db from "./database.js";

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/books", (req, res) => {
  const books = db.getBooks();
  res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const book = db.getBookbyId(bookId);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.post("/books", (req, res) => {
  const newBook = req.body;
  db.addBook(newBook)
    .then(() => res.status(201).json(newBook))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to add book" });
    });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  Promise.resolve(db.updateBook(bookId, updatedBook.title, updatedBook.author)) // Adjust parameters as needed
    .then(() => res.status(200).json(updatedBook))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to update book" });
    });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  db.deleteBook(bookId)
    .then(() => res.status(204).send())
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to delete book" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} (http://localhost:${PORT})`);
});
