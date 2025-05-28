import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoints

// Összes számla lekérdezése
app.get('/api/szamlak', (req, res) => {
    const query = `
        SELECT 
            s.id,
            s.szamla_szama,
            s.szamla_kelte,
            s.teljesites_datuma,
            s.fizetesi_hatarido,
            s.vegosszeg,
            s.afa_merteke,
            k.nev as kiallito_nev,
            k.cim as kiallito_cim,
            k.adoszam as kiallito_adoszam,
            v.nev as vevo_nev,
            v.cim as vevo_cim,
            v.adoszam as vevo_adoszam
        FROM szamlak s
        JOIN kiallit_ok k ON s.kiallito_id = k.id
        JOIN vevok v ON s.vevo_id = v.id
        ORDER BY s.szamla_kelte DESC
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Új számla hozzáadása
app.post('/api/szamlak', (req, res) => {
    const { 
        kiallito_id, 
        vevo_id, 
        szamla_szama, 
        szamla_kelte, 
        teljesites_datuma, 
        fizetesi_hatarido, 
        vegosszeg, 
        afa_merteke 
    } = req.body;

    const query = `INSERT INTO szamlak 
        (kiallito_id, vevo_id, szamla_szama, szamla_kelte, teljesites_datuma, fizetesi_hatarido, vegosszeg, afa_merteke) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(query, [kiallito_id, vevo_id, szamla_szama, szamla_kelte, teljesites_datuma, fizetesi_hatarido, vegosszeg, afa_merteke], 
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, message: 'Számla sikeresen létrehozva!' });
        });
});

// Egy számla lekérdezése ID alapján
app.get('/api/szamlak/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
            s.id,
            s.szamla_szama,
            s.szamla_kelte,
            s.teljesites_datuma,
            s.fizetesi_hatarido,
            s.vegosszeg,
            s.afa_merteke,
            k.nev as kiallito_nev,
            k.cim as kiallito_cim,
            k.adoszam as kiallito_adoszam,
            v.nev as vevo_nev,
            v.cim as vevo_cim,
            v.adoszam as vevo_adoszam
        FROM szamlak s
        JOIN kiallit_ok k ON s.kiallito_id = k.id
        JOIN vevok v ON s.vevo_id = v.id
        WHERE s.id = ?
    `;
    
    db.get(query, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Számla nem található!' });
            return;
        }
        res.json(row);
    });
});

// Számla törlése
app.delete('/api/szamlak/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM szamlak WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Számla sikeresen törölve!' });
    });
});

// Vevők listája
app.get('/api/vevok', (req, res) => {
    db.all('SELECT * FROM vevok ORDER BY nev', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Új vevő hozzáadása
app.post('/api/vevok', (req, res) => {
    const { nev, cim, adoszam } = req.body;
    
    db.run('INSERT INTO vevok (nev, cim, adoszam) VALUES (?, ?, ?)', [nev, cim, adoszam], 
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, message: 'Vevő sikeresen létrehozva!' });
        });
});

// Kiállítók listája
app.get('/api/kiallitok', (req, res) => {
    db.all('SELECT * FROM kiallit_ok ORDER BY nev', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Új kiállító hozzáadása
app.post('/api/kiallitok', (req, res) => {
    const { nev, cim, adoszam } = req.body;
    
    db.run('INSERT INTO kiallit_ok (nev, cim, adoszam) VALUES (?, ?, ?)', [nev, cim, adoszam], 
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, message: 'Kiállító sikeresen létrehozva!' });
        });
});

// Statisztikák
app.get('/api/statisztikak', (req, res) => {
    const queries = {
        osszesVegosszeg: 'SELECT SUM(vegosszeg) as total FROM szamlak',
        szamlakSzama: 'SELECT COUNT(*) as count FROM szamlak',
        vevokSzama: 'SELECT COUNT(*) as count FROM vevok'
    };

    const results = {};
    let completed = 0;

    Object.keys(queries).forEach(key => {
        db.get(queries[key], [], (err, row) => {
            if (!err) {
                results[key] = row;
            }
            completed++;
            if (completed === Object.keys(queries).length) {
                res.json(results);
            }
        });
    });
});

// Szerver indítása
app.listen(PORT, () => {
    console.log(`Számla API szerver fut a http://localhost:${PORT} címen`);
});

export default app;
