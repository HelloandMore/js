import express from "express";

const app = express();
app.use(express.json());

let users = [
    { firstName: "Harry", lastName: "Potter" },
    { firstName: "Ronald", lastName: "Bilius Weasley" },
    { firstName: "Hermione", lastName: "Jean Granger" },
    { firstName: "Draco", lastName: "Malfoy" },
    { firstName: "Cedric", lastName: "Diggory" },
    { firstName: "Luna", lastName: "Lovegood" },
];

// GET /users - get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET /users/:id - get user by id
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < users.length) {
        res.json(users[id]);
    } else {
        res.json({});
    }
});

// POST /users - add new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.json(newUser);
});

// PUT /users/:id - update user by id
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName } = req.body;
    if (id >= 0 && id < users.length) {
        if (firstName && lastName) {
            users[id] = { firstName, lastName };
            res.status(201).json(users[id]);
        } else {
            res.status(400).json({ message: "Both firstName and lastName are required" });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// PATCH /users/:id - partially update user by id
app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < users.length) {
        users[id] = { ...users[id], ...req.body };
        res.json(users[id]);
    } else {
        res.json({ message: "User not found" });
    }
});

// DELETE /users/:id - delete user by id
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < users.length) {
        users.splice(id, 1);
        res.json({ message: "Delete successful" });
    } else {
        res.json({ message: "User not found" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});