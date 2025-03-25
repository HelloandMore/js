import express from 'express';
import { initDb, dbAll, dbGet, dbRun } from './util/database.js';

const app = express();
const port = 3000;

app.get('/users', async (req, res) => {
    const users = await dbAll(`SELECT * FROM users;`);
    res.status(200).json(users);
});

app.get('/users/:id', async (req, res) => {
    const user = await dbGet(`SELECT * FROM users WHERE id = ?;`, req.params.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.status(200).json(user);
});

app.use((req, res, next, err) => {
    if (err) {
        console.error(err);
        res.status(500).send(`Something went wrong: ${err.message}`);
    }
});

async function startServer() {
    await initDb();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
}

startServer();