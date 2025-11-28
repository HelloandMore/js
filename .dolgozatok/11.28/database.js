import Database from 'better-sqlite3';

const db = new Database('books.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    author TEXT NOT NULL
  )
`);

const count = db.prepare('SELECT COUNT(*) as count FROM books').get().count;
if (count === 0) {
  const insert = db.prepare('INSERT INTO books (title, year, author) VALUES (?, ?, ?)');

  insert.run('A Gyűrűk Ura', 1954, 'J.R.R. Tolkien');
  insert.run('Harry Potter és a Bölcsek Köve', 1997, 'J.K. Rowling');
  insert.run('Az alapítvány', 1951, 'Isaac Asimov');
  insert.run('Dűne', 1965, 'Frank Herbert');
}

export default db;