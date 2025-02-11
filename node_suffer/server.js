import express from 'express';
import __dirname from './util/rootpath.js';

// 1. feladat

const helloApp = express();

helloApp.get('/', (req, res) => {
    res.send('Hello üdvözöllek a weboldalamon.');
});

helloApp.listen(3003, () => {
    console.log('Hello project server is running on port 3003');
});