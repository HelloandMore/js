import Database from 'better-sqlite3';

const db = new Database('books.db');

// Az exec() SQL utasításokat hajt végre eredmény visszaadása nélkül.
// Itt használjuk a táblaszerkezet létrehozásához, ha az nem létezik.
db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL
  )
`);

const count = db.prepare('SELECT COUNT(*) as count FROM books').get().count;
if (count === 0) {
  const insert = db.prepare('INSERT INTO books (title, author) VALUES (?, ?)');
  
  insert.run('A Gyűrűk Ura', 'J.R.R. Tolkien');
  insert.run('Harry Potter és a Bölcsek Köve', 'J.K. Rowling');
  insert.run('Az alapítvány', 'Isaac Asimov');
  insert.run('Dűne', 'Frank Herbert');
}

export default db;