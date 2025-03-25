import express from 'express';
import movies from './movies.js';

const app = express();
const port = 3000;

app.use(express.json());

// GET all movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

// GET movie by id
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
});

// POST new movie
app.post('/movies', (req, res) => {
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        oscar: req.body.oscar
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// PUT update movie by id
app.put('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');

    movie.title = req.body.title;
    movie.director = req.body.director;
    movie.year = req.body.year;
    movie.oscar = req.body.oscar;

    res.json(movie);
});

// DELETE movie by id
app.delete('/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).send('Movie not found');

    const deletedMovie = movies.splice(movieIndex, 1);
    res.json(deletedMovie);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});