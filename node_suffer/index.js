import express from 'express';
import __dirname from './util/rootpath.js';
import path from 'path';

// 2. feladat

const pageApp = express();
const pageDirname = path.resolve();

pageApp.get('/index', (req, res) => {
    res.sendFile(path.join(pageDirname, 'views', 'index.html'));
});

pageApp.listen(3001, () => {
    console.log('Page project server is running on port 3001');
});