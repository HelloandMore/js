import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let cars = [
    { id: 1, brand: 'Toyota', model: 'Camry' },
    { id: 2, brand: 'Honda', model: 'Civic' },
    { id: 3, brand: 'Ford', model: 'Focus' }
];

let nextId = 4;

app.get('/cars', (req, res) => {
    res.json(cars);
});

app.get('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find(c => c.id === id);
    
    if (!car) {
        return res.status(404).json({ error: 'Car not found' });
    }
    
    res.json(car);
});

app.post('/cars', (req, res) => {
    const { brand, model } = req.body;
    
    if (!brand || !model) {
        return res.status(400).json({ error: 'Brand and model are required' });
    }
    
    const newCar = {
        id: nextId++,
        brand,
        model
    };
    
    cars.push(newCar);
    res.status(201).json(newCar);
});

app.put('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { brand, model } = req.body;
    const carIndex = cars.findIndex(c => c.id === id);
    
    if (carIndex === -1) {
        return res.status(404).json({ error: 'Car not found' });
    }
    
    if (!brand || !model) {
        return res.status(400).json({ error: 'Brand and model are required' });
    }
    
    cars[carIndex] = { id, brand, model };
    res.json(cars[carIndex]);
});

app.delete('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const carIndex = cars.findIndex(c => c.id === id);
    
    if (carIndex === -1) {
        return res.status(404).json({ error: 'Car not found' });
    }
    
    cars.splice(carIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});