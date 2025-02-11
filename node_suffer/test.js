import express from 'express';
import __dirname from './util/rootpath.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/index', (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});