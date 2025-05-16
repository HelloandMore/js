import express from "express";
import * as db from "./util/database.js";

const PORT = 8080;
const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  try {
    const users = db.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ messahe: error.message });
  }
});

app.get("/users/:id", (req, res) => {
  try {
    const user = db.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ messahe: error.message });
  }
});

app.post("/users", (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ message: "Invalid data" });
    }
    const result = db.saveUser(name, age);
    if (result.changes != 1) {
      return res.status(501).json({ message: "Insert failed" });
    }
    res.status(201).json({ id: result.lastInsertRowid, name, age });
  } catch (error) {
    res.status(500).json({ messahe: error.message });
  }
});

app.put("/users/:id", (req, res) => {
  try {
    const id = +req.params.id;
    const user = getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ message: "Invalid data" });
    }
    result = db.updateUser(id, name, age);
    if (result.changes != 1) {
      return res.status(501).json({ message: "Update failed" });
    }
    res.status(200).json({ id, name, age });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/users/:id", (req, res) => {
  try {
    const user = getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    result = db.deleteUser(req.params.id);
    if (result.changes != 1) {
      return res.status(501).json({ message: "Delete failed" });
    }
    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));