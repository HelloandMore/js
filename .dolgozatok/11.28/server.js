import express from 'express';
import db from './database.js';

const app = express();
const PORT = 3000;

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
    const { title, author, year } = req.body;
    
    if (!title || !author || !year) {
      return res.status(400).json({ error: 'Cím, év és szerző megadása kötelező' });
    }

    const stmt = db.prepare('INSERT INTO books (title, author, year) VALUES (?, ?, ?)');
    const result = stmt.run(title, author, year);

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Szerver hiba történt' });
  }
});

app.listen(PORT, () => {
  console.log(`Server fut a következő címen: http://localhost:${PORT}`);
});
