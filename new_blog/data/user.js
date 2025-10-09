import db from "./db.js"; // Ensure the correct file extension is used
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt
const password1 = bcrypt.hashSync("password123", SALT_ROUNDS);
const password2 = bcrypt.hashSync("password456", SALT_ROUNDS);

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        name TEXT,
        password TEXT
    )`
).run();

db.prepare(
  `
    INSERT INTO users (email, name, password)
    VALUES
    ('john.doe@example.com', 'John Doe', '${password1}'),
    ('jane.doe@example.com', 'Jane Doe', '${password2}')
`
).run();
