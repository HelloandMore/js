import express from 'express';
import bodyParser from 'body-parser';
import wizards from './wizards.js';

const app = express();

app.use(bodyParser.json());

// GET all wizards
app.get('/wizard', (req, res) => {
    res.json(wizards);
});

// GET a wizard by ID
app.get('/wizard/:id', (req, res) => {
    const wizard = wizards.find(w => w.id === req.params.id);
    if (wizard) {
        res.json(wizard);
    } else {
        res.status(404).send('Wizard not found');
    }
});

// POST a new wizard
app.post('/wizard', (req, res) => {
    const newWizard = { id: uuidv4(), ...req.body };
    wizards.push(newWizard);
    res.status(201).json(newWizard);
});

// PUT update a wizard by ID
app.put('/wizard/:id', (req, res) => {
    const index = wizards.findIndex(w => w.id === req.params.id);
    if (index !== -1) {
        wizards[index] = { id: req.params.id, ...req.body };
        res.json(wizards[index]);
    } else {
        res.status(404).send('Wizard not found');
    }
});

// DELETE a wizard by ID
app.delete('/wizard/:id', (req, res) => {
    const index = wizards.findIndex(w => w.id === req.params.id);
    if (index !== -1) {
        const deletedWizard = wizards.splice(index, 1);
        res.json(deletedWizard);
    } else {
        res.status(404).send('Wizard not found');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});