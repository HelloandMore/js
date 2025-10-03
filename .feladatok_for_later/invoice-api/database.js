import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'szamlak.db');
const db = new (sqlite3.verbose()).Database(dbPath);

// Táblák létrehozása
db.serialize(() => {
    // Kiállítók tábla
    db.run(`CREATE TABLE IF NOT EXISTS kiallit_ok (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nev TEXT NOT NULL,
        cim TEXT NOT NULL,
        adoszam TEXT NOT NULL UNIQUE
    )`);

    // Vevők tábla
    db.run(`CREATE TABLE IF NOT EXISTS vevok (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nev TEXT NOT NULL,
        cim TEXT NOT NULL,
        adoszam TEXT NOT NULL UNIQUE
    )`);    // Számlák tábla - jogszabálynak megfelelő séma
    db.run(`CREATE TABLE IF NOT EXISTS szamlak (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        kiallito_id INTEGER NOT NULL,
        vevo_id INTEGER NOT NULL,
        szamla_szama TEXT NOT NULL UNIQUE,
        szamla_kelte DATE NOT NULL,
        teljesites_datuma DATE NOT NULL,
        fizetesi_hatarido DATE NOT NULL,
        vegosszeg DECIMAL(10,2) NOT NULL,
        afa_merteke DECIMAL(5,2) NOT NULL,
        -- Kiállítási időpontban rögzített vevő adatok (nem módosíthatók)
        kiallito_nev TEXT NOT NULL,
        kiallito_cim TEXT NOT NULL,
        kiallito_adoszam TEXT NOT NULL,
        vevo_nev TEXT NOT NULL,
        vevo_cim TEXT NOT NULL,
        vevo_adoszam TEXT NOT NULL,
        -- Stornózás támogatása
        stornozott BOOLEAN DEFAULT FALSE,
        storno_datum DATE NULL,
        storno_ok TEXT NULL,
        eredeti_szamla_id INTEGER NULL,
        -- Létrehozás dátuma (5 év megőrzés miatt)
        letrehozva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (kiallito_id) REFERENCES kiallit_ok (id),
        FOREIGN KEY (vevo_id) REFERENCES vevok (id),
        FOREIGN KEY (eredeti_szamla_id) REFERENCES szamlak (id)
    )`);

    // Számlák tételei tábla
    db.run(`CREATE TABLE IF NOT EXISTS szamla_tetelek (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        szamla_id INTEGER NOT NULL,
        megnevezes TEXT NOT NULL,
        mennyiseg DECIMAL(10,3) NOT NULL,
        mertekegyseg TEXT NOT NULL,
        egysegar DECIMAL(10,2) NOT NULL,
        netto_ertek DECIMAL(10,2) NOT NULL,
        afa_kulcs DECIMAL(5,2) NOT NULL,
        afa_ertek DECIMAL(10,2) NOT NULL,
        brutto_ertek DECIMAL(10,2) NOT NULL,
        sorszam INTEGER NOT NULL,
        FOREIGN KEY (szamla_id) REFERENCES szamlak (id)
    )`);

    console.log('Adatbázis táblák létrehozva!');
});

// Mintaadatok beszúrása
db.serialize(() => {
    // Kiállító beszúrása
    db.run(`INSERT OR IGNORE INTO kiallit_ok (nev, cim, adoszam) VALUES 
        ('ABC Kft.', '1234 Budapest, Fő utca 1.', '12345678-2-01')`);

    // Vevők beszúrása
    const vevok = [
        ['XYZ Zrt.', '1111 Budapest, Váci út 10.', '11111111-1-11'],
        ['Teszt Bt.', '2222 Debrecen, Kossuth tér 5.', '22222222-2-22'],
        ['Minta Kft.', '3333 Szeged, Dugonics tér 3.', '33333333-3-33']
    ];

    vevok.forEach(vevo => {
        db.run(`INSERT OR IGNORE INTO vevok (nev, cim, adoszam) VALUES (?, ?, ?)`, vevo);
    });    // Számlák beszúrása (3 számla vevőnként) - új séma szerint
    const szamlak = [
        // XYZ Zrt. számlái
        [1, 1, 'SZ-2025-001', '2025-01-15', '2025-01-15', '2025-02-14', 120000, 27, 'ABC Kft.', '1234 Budapest, Fő utca 1.', '12345678-2-01', 'XYZ Zrt.', '1111 Budapest, Váci út 10.', '11111111-1-11'],
        [1, 1, 'SZ-2025-002', '2025-02-10', '2025-02-10', '2025-03-12', 85000, 27, 'ABC Kft.', '1234 Budapest, Fő utca 1.', '12345678-2-01', 'XYZ Zrt.', '1111 Budapest, Váci út 10.', '11111111-1-11'],
        [1, 1, 'SZ-2025-003', '2025-03-05', '2025-03-05', '2025-04-04', 95000, 27, 'ABC Kft.', '1234 Budapest, Fő utca 1.', '12345678-2-01', 'XYZ Zrt.', '1111 Budapest, Váci út 10.', '11111111-1-11'],

        // Teszt Bt. számlái
        [1, 2, 'SZ-2025-004', '2025-01-20', '2025-01-20', '2025-02-19', 45000, 18, 'ABC Kft.', '1234 Budapest, Fő utca 1.', '12345678-2-01', 'Teszt Bt.', '2222 Debrecen, Kossuth tér 5.', '22222222-2-22'],
        [1, 2, 'SZ-2025-005', '2025-02-15', '2025-02-15', '2025-03-17', 67000, 18, 'ABC Kft.', '1234 Budapest, Fő utca 1.', '12345678-2-01', 'Teszt Bt.', '2222 Debrecen, Kossuth tér 5.', '22222222-2-22'],
        [1, 2, 'SZ-2025-006', '2025-03-10', '2025-03-10', '2025-04-09', 78000, 18, 'ABC Kft.', '1234 Budapest, Fő utca 1.', '12345678-2-01', 'Teszt Bt.', '2222 Debrecen, Kossuth tér 5.', '22222222-2-22'],

        // Minta Kft. számlái
        [1, 3, 'SZ-2025-007', '2025-01-25', '2025-01-25', '2025-02-24', 155000, 27, 'ABC Kft.', '1234 Budapest, Fő utca 1.', '12345678-2-01', 'Minta Kft.', '3333 Szeged, Dugonics tér 3.', '33333333-3-33'],
        [1, 3, 'SZ-2025-008', '2025-02-20', '2025-02-20', '2025-03-22', 89000, 27, 'ABC Kft.', '1234 Budapest, Fő utca 1.', '12345678-2-01', 'Minta Kft.', '3333 Szeged, Dugonics tér 3.', '33333333-3-33'],
        [1, 3, 'SZ-2025-009', '2025-03-15', '2025-03-15', '2025-04-14', 134000, 27, 'ABC Kft.', '1234 Budapest, Fő utca 1.', '12345678-2-01', 'Minta Kft.', '3333 Szeged, Dugonics tér 3.', '33333333-3-33']
    ];

    szamlak.forEach(szamla => {
        db.run(`INSERT OR IGNORE INTO szamlak 
            (kiallito_id, vevo_id, szamla_szama, szamla_kelte, teljesites_datuma, fizetesi_hatarido, vegosszeg, afa_merteke, 
             kiallito_nev, kiallito_cim, kiallito_adoszam, vevo_nev, vevo_cim, vevo_adoszam) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, szamla);
    }); console.log('Mintaadatok beszúrva!');
});

export default db;
