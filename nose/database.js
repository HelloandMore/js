import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite");

db.prepare(
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT)"
).run();

export const getBooks = () => {
  return db.prepare("SELECT * FROM books").all();
};
export const getBookbyId = (id) => {
  return db.prepare("SELECT * FROM books WHERE id = ?").get(id);
};
export const saveBook = (title, author) => {
  return db.prepare("INSERT INTO books (title, author) VALUES (?, ?)").run(
    title,
    author
  );
};
export const deleteBook = (id) => {
  return db.prepare("DELETE FROM books WHERE id = ?").run(id);
};
export const updateBook = (id, title, author) => {
  return db.prepare("UPDATE books SET title = ?, author = ? WHERE id = ?").run(
    title,
    author,
    id
  );
};

const books = getBooks()
if (!books.length) {
    saveBook("The Great Gatsby", "F. Scott Fitzgerald");
    saveBook("To Kill a Mockingbird", "Harper Lee");
    saveBook("1984", "George Orwell");
    saveBook("Pride and Prejudice", "Jane Austen");
    saveBook("The Catcher in the Rye", "J.D. Salinger");
    saveBook("The Hobbit", "J.R.R. Tolkien");
}