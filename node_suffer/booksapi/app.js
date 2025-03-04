import express from 'express';
import books from './books.js';

const app = express();
app.use(express.json());

app.post('/books', (req, res) => {
    const { author, title, year } = req.body;
    const book = { id: Date.now().toString(), author, title, year };
    books.push(book);
    res.status(201).json(book);
});


// GET /books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /books/:id
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// POST /books
app.post('/books', (req, res) => {
    const { author, title, year } = req.body;
    const book = { id: Date.now().toString(), author, title, year };
    books.push(book);
    res.status(201).json(book);
});

// PUT /books/:id
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (book) {
        book.author = req.body.author;
        book.title = req.body.title;
        book.year = req.body.year;
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// DELETE /books/:id
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);
    if (index !== -1) {
        const deletedBook = books.splice(index, 1)[0];
        res.json(deletedBook);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});