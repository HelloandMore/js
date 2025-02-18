import express, { json } from 'express';
import __dirname from '../util/rootpath.js';
import path from 'path';

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.get("/:parameter", (req, res) => {
    const parameter = req.params.parameter;
    if (parameter === "flowers") {
        const flowers = [
            { name: "Rose", category: "Perennial" },
            { name: "Sunflower", category: "Annual" },
            { name: "Lily", category: "Perennial" }
        ];
        res.json(flowers);
    } else if (parameter === "trees") {
        const trees = [
            { name: "Oak", category: "Deciduous" },
            { name: "Pine", category: "Evergreen" },
            { name: "Maple", category: "Deciduous" }
        ];
        res.json(trees);
    } else {
        res.sendFile(path.join(__dirname, "./views/404.html"));
    }
});

app.get("/plants/:parameter", (req, res) => {
    const parameter = req.params.parameter;
    if (parameter === "flowers") {
        const flowers = [
            { name: "Rose", category: "Perennial" },
            { name: "Sunflower", category: "Annual" },
            { name: "Lily", category: "Perennial" }
        ];
        res.json(flowers);
    } else if (parameter === "trees") {
        const trees = [
            { name: "Oak", category: "Deciduous" },
            { name: "Pine", category: "Evergreen" },
            { name: "Maple", category: "Deciduous" }
        ];
        res.json(trees);
    } else {
        res.json([]);
    }
});

app.listen(3010, () => {
    console.log('Server is running on port 3010');
});