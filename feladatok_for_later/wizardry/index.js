const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// SQLite adatbázis kapcsolat
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Varázsló modell definiálása
const Wizard = sequelize.define('Wizard', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  magicWand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  house: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Adatbázis inicializálása
(async () => {
  await sequelize.sync({ force: true });
  console.log('Adatbázis szinkronizálva');
})();

// Szerver konfiguráció
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Végpontok
// Összes varázsló
app.get('/wizard', async (req, res) => {
  try {
    const wizards = await Wizard.findAll();
    res.json(wizards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Új varázsló
app.post('/wizard', async (req, res) => {
  try {
    const wizard = await Wizard.create(req.body);
    res.status(201).json(wizard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Egy varázsló
app.get('/wizard/:id', async (req, res) => {
  try {
    const wizard = await Wizard.findByPk(req.params.id);
    if (!wizard) return res.status(404).json({ message: 'Varázsló nem található' });
    res.json(wizard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Frissítés
// PUT végpont javítása
app.put('/wizard/:id', async (req, res) => {
  try {
    const [updated] = await Wizard.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated === 0) return res.status(404).json({ message: 'Varázsló nem található' });
    const updatedWizard = await Wizard.findByPk(req.params.id);
    res.json(updatedWizard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Törlés
app.delete('/wizard/:id', async (req, res) => {
  try {
    const deleted = await Wizard.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 0) return res.status(404).json({ message: 'Varázsló nem található' });
    res.json({ message: 'Varázsló törölve' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Szerver indítása
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});