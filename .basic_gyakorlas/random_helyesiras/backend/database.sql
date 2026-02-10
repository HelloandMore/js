-- Adatbázis létrehozása
CREATE DATABASE IF NOT EXISTS szogyak CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;

USE szogyak;

-- Tábla létrehozása
CREATE TABLE IF NOT EXISTS szavak (
    azon INT AUTO_INCREMENT PRIMARY KEY,
    szoto VARCHAR(100) NOT NULL,
    szofaj VARCHAR(10) NOT NULL,
    gyakori INT NOT NULL,
    INDEX idx_szofaj (szofaj),
    INDEX idx_szoto (szoto),
    INDEX idx_gyakori (gyakori)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- Adatok importálása
-- LOAD DATA LOCAL INFILE 'szo10000.txt' 
-- INTO TABLE szavak 
-- CHARACTER SET utf8 
-- FIELDS TERMINATED BY '\t' 
-- LINES TERMINATED BY '\n' 
-- IGNORE 1 LINES 
-- (azon, szoto, szofaj, gyakori);

-- Vagy INSERT utasításokkal (a fájl tartalmából):
-- Az adatokat a Node.js alkalmazással vagy phpMyAdmin-nal importálhatod
