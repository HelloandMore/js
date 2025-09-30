import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import * as db from "./data/db.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/users', (req, res) => {
    const users = db.getUsers();
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
});

app.post('/users', (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const saved = db.saveUser(email, hashedPassword);
    return res.status(201).json(saved);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

