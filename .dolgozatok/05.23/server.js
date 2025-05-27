import express from 'express';
import db from './database.js';

const app = express();
const PORT = 8080;

// Use built-in Express JSON parser instead of body-parser
app.use(express.json());

app.get('/books', (req, res) => {
  try {
    const books = db.prepare('SELECT * FROM books').all();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Szerver hiba történt' });
  }
});

app.get('/books/:id', (req, res) => {
  try {
    const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
    
    if (!book) {
      return res.status(404).json({ error: 'Könyv nem található' });
    }
    
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Szerver hiba történt' });
  }
});

app.post('/books', (req, res) => {
  try {
    const { title, author } = req.body;
    
    if (!title || !author) {
      return res.status(400).json({ error: 'Cím és szerző megadása kötelező' });
    }
    
    const stmt = db.prepare('INSERT INTO books (title, author) VALUES (?, ?)');
    const result = stmt.run(title, author);
    
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Szerver hiba történt' });
  }
});

app.delete('/books/:id', (req, res) => {
  try {
    const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
    
    if (!book) {
      return res.status(404).json({ error: 'Könyv nem található' });
    }
    
    db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id);
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Szerver hiba történt' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
