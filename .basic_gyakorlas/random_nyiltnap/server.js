import express, { json } from "express";
import db, { setupDatabase } from "./db/database.js";

const app = express();
const PORT = 3321;
const BASE_URI = "/nyiltnap/api/v1";

// Initialize database and import data
setupDatabase();

// Middleware
app.use(json());

// 2. GET /telepules - Get students from a specific city
app.get(`${BASE_URI}/telepules`, (req, res) => {
  const { nev } = req.query;

  if (!nev) {
    return res.status(400).json({ error: 'Parameter "nev" is required' });
  }

  try {
    const stmt = db.prepare("SELECT nev FROM diakok WHERE telepules = ?");
    const results = stmt.all(nev);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. GET /tanora - Get all English lessons sorted by date and lesson number
app.get(`${BASE_URI}/tanora`, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT datum, terem, orasorszam 
      FROM orak 
      WHERE targy = 'angol'
      ORDER BY datum, orasorszam
    `);
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET /9-matematika-fizika - Get 9th grade math and physics lessons
app.get(`${BASE_URI}/9-matematika-fizika`, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT csoport, targy, datum 
      FROM orak 
      WHERE csoport LIKE '9%' AND (targy = 'matematika' OR targy = 'fizika')
      ORDER BY targy
    `);
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. GET /telepulesfo - Get student count by city in descending order
app.get(`${BASE_URI}/telepulesfo`, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT telepules, COUNT(*) as diakokszama
      FROM diakok 
      GROUP BY telepules
      ORDER BY diakokszama DESC
    `);
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. GET /tantargyak - Get unique subjects in alphabetical order
app.get(`${BASE_URI}/tantargyak`, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT DISTINCT targy 
      FROM orak 
      ORDER BY targy
    `);
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. GET /tanar - Get registered students for a teacher on a specific date
app.get(`${BASE_URI}/tanar`, (req, res) => {
  const { nev, datum } = req.query;

  if (!nev || !datum) {
    return res
      .status(400)
      .json({ error: 'Parameters "nev" and "datum" are required' });
  }

  try {
    const stmt = db.prepare(`
      SELECT DISTINCT d.nev, d.email, d.telefon
      FROM diakok d
      JOIN kapcsolat k ON d.id = k.diakid
      JOIN orak o ON k.oraid = o.id
      WHERE o.tanar = ? AND o.datum = ?
    `);
    const results = stmt.all(nev, datum);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. GET /telepulesrol - Get students from the same city excluding the specified student
app.get(`${BASE_URI}/telepulesrol`, (req, res) => {
  const { nev } = req.query;

  if (!nev) {
    return res.status(400).json({ error: 'Parameter "nev" is required' });
  }

  try {
    const stmt = db.prepare(`
      SELECT d2.nev
      FROM diakok d1
      JOIN diakok d2 ON d1.telepules = d2.telepules
      WHERE d1.nev = ? AND d2.nev != ?
    `);
    const results = stmt.all(nev, nev);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. GET /szabad - Get lessons with available spots sorted by free spots descending
app.get(`${BASE_URI}/szabad`, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT 
        o.id,
        o.datum,
        o.targy,
        o.csoport,
        o.terem,
        o.tanar,
        o.ferohely,
        o.orasorszam,
        (o.ferohely - COUNT(k.id)) as szabad
      FROM orak o
      LEFT JOIN kapcsolat k ON o.id = k.oraid
      GROUP BY o.id
      HAVING szabad > 0
      ORDER BY szabad DESC
    `);
    const results = stmt.all();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Base URI: ${BASE_URI}`);
  console.log("\nAvailable endpoints:");
  console.log(`  GET ${BASE_URI}/telepules?nev=<telepulesnev>`);
  console.log(`  GET ${BASE_URI}/tanora`);
  console.log(`  GET ${BASE_URI}/9-matematika-fizika`);
  console.log(`  GET ${BASE_URI}/telepulesfo`);
  console.log(`  GET ${BASE_URI}/tantargyak`);
  console.log(`  GET ${BASE_URI}/tanar?nev=<tanarnev>&datum=<datum>`);
  console.log(`  GET ${BASE_URI}/telepulesrol?nev=<diaknev>`);
  console.log(`  GET ${BASE_URI}/szabad`);
});
