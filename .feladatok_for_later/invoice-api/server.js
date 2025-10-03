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

// Összes számla lekérdezése - stornózott számlákkal együtt
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
            s.stornozott,
            s.storno_datum,
            s.storno_ok,
            s.kiallito_nev,
            s.kiallito_cim,
            s.kiallito_adoszam,
            s.vevo_nev,
            s.vevo_cim,
            s.vevo_adoszam,
            s.letrehozva
        FROM szamlak s
        ORDER BY s.szamla_kelte DESC, s.id DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Új számla hozzáadása - jogszabálynak megfelelő validációval
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

    // Fizetési határidő validáció - maximum 30 nap
    const kelte = new Date(szamla_kelte);
    const hatarido = new Date(fizetesi_hatarido);
    const napokKulonbseg = (hatarido - kelte) / (1000 * 60 * 60 * 24);

    if (napokKulonbseg > 30) {
        res.status(400).json({
            error: 'A fizetési határidő nem lehet több mint 30 nap a kiállítás dátumától!'
        });
        return;
    }

    // Kiállító és vevő adatok lekérdezése (rögzítés a számlában)
    const kiallito_query = 'SELECT * FROM kiallit_ok WHERE id = ?';
    const vevo_query = 'SELECT * FROM vevok WHERE id = ?';

    db.get(kiallito_query, [kiallito_id], (err, kiallito) => {
        if (err || !kiallito) {
            res.status(400).json({ error: 'Kiállító nem található!' });
            return;
        }

        db.get(vevo_query, [vevo_id], (err, vevo) => {
            if (err || !vevo) {
                res.status(400).json({ error: 'Vevő nem található!' });
                return;
            }

            const query = `INSERT INTO szamlak 
                (kiallito_id, vevo_id, szamla_szama, szamla_kelte, teljesites_datuma, 
                 fizetesi_hatarido, vegosszeg, afa_merteke, kiallito_nev, kiallito_cim, 
                 kiallito_adoszam, vevo_nev, vevo_cim, vevo_adoszam) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            db.run(query, [
                kiallito_id, vevo_id, szamla_szama, szamla_kelte, teljesites_datuma,
                fizetesi_hatarido, vegosszeg, afa_merteke, kiallito.nev, kiallito.cim,
                kiallito.adoszam, vevo.nev, vevo.cim, vevo.adoszam
            ], function (err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({ id: this.lastID, message: 'Számla sikeresen létrehozva!' });
            });
        });
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
            s.stornozott,
            s.storno_datum,
            s.storno_ok,
            s.kiallito_nev,
            s.kiallito_cim,
            s.kiallito_adoszam,
            s.vevo_nev,
            s.vevo_cim,
            s.vevo_adoszam,
            s.letrehozva
        FROM szamlak s
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

// Számla stornózása (törlés helyett)
app.post('/api/szamlak/:id/storno', (req, res) => {
    const { id } = req.params;
    const { storno_ok } = req.body;

    if (!storno_ok) {
        res.status(400).json({ error: 'Stornózás oka kötelező!' });
        return;
    }

    const query = `UPDATE szamlak 
        SET stornozott = TRUE, storno_datum = DATE('now'), storno_ok = ? 
        WHERE id = ? AND stornozott = FALSE`;

    db.run(query, [storno_ok, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Számla nem található vagy már stornózva!' });
            return;
        }
        res.json({ message: 'Számla sikeresen stornózva!' });
    });
});

// Számla törlése - ELTÁVOLÍTVA (jogszabály szerint nem lehet törölni)
app.delete('/api/szamlak/:id', (req, res) => {
    // Jogszabály szerint a számlákat nem lehet törölni, csak stornózni!
    res.status(403).json({
        error: 'A számlákat jogszabály szerint nem lehet törölni! Használja a stornózási funkciót!'
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
        function (err) {
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
        function (err) {
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
