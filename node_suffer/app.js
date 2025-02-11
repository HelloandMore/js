import express from 'express';
import __dirname from './util/rootpath.js';
import path from 'path';

// 3. feladat

const carsApp = express();
const carsDirname = path.resolve();

carsApp.get('/', (req, res) => {
    res.sendFile(path.join(carsDirname, 'views', 'index.html'));
});

carsApp.get('/car', (req, res) => {
    res.sendFile(path.join(carsDirname, 'views', 'car.html'));
});

carsApp.use((req, res) => {
    res.status(404).sendFile(path.join(carsDirname, 'views', '404.html'));
});

carsApp.listen(3000, () => {
    console.log('Cars project server is running on port 3000');
});