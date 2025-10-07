import db from "./db";

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        name TEXT,
        password TEXT
    )`).run();

db.prepare(`
    INSERT INTO users (email, name, password)
    VALUES
    ('john.doe@example.com', 'John Doe', 'password123'),
    ('jane.doe@example.com', 'Jane Doe', 'password456')
`).run();