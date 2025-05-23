import express from 'express';
import bodyParser from 'body-parser';
import Database from 'better-sqlite3';

const db = new Database('books.db');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.get('/books', (req, res) => {
  const books = db.prepare('SELECT * FROM books').all();
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: 'Könyv nem található' });
  }
  
  res.json(book);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ error: 'Cím és szerző megadása kötelező' });
  }
  
  const stmt = db.prepare('INSERT INTO books (title, author) VALUES (?, ?)');
  const result = stmt.run(title, author);
  
  res.status(201).json({ id: result.lastInsertRowid });
});

app.delete('/books/:id', (req, res) => {
  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: 'Könyv nem található' });
  }
  
  db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id);
  
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
