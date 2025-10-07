import db from "./db";

db.prepare(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        title TEXT,
        content TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`).run();

db.prepare(`
    INSERT INTO posts (userId, title, content)
    VALUES
    (1, 'First Post', 'This is the content of the first post.'),
    (2, 'Second Post', 'This is the content of the second post.')
`).run();

export default db;