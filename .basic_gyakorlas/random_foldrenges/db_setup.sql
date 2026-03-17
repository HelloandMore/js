CREATE DATABASE IF NOT EXISTS renges CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE renges;

CREATE TABLE telepules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    varmegye VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE naplo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    datum DATE NOT NULL,
    ido TIME NOT NULL,
    telepid INT NOT NULL,
    magnitudo DECIMAL(4,1),
    intenzitas DECIMAL(4,1),
    FOREIGN KEY (telepid) REFERENCES telepules(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Import telepules.csv (comma-separated, UTF-8, Windows line endings)
LOAD DATA LOCAL INFILE 'telepules.csv'
INTO TABLE telepules
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(id, nev, varmegye);

-- Sync AUTO_INCREMENT after explicit id insert
ALTER TABLE telepules AUTO_INCREMENT = 122;

-- Import naplo.csv
LOAD DATA LOCAL INFILE 'naplo.csv'
INTO TABLE naplo
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(id, @datum_str, ido, telepid, @magnitudo, @intenzitas)
SET datum       = STR_TO_DATE(@datum_str, '%Y.%m.%d'),
    magnitudo   = NULLIF(@magnitudo, ''),
    intenzitas  = NULLIF(@intenzitas, '');

-- Sync AUTO_INCREMENT after explicit id insert
ALTER TABLE naplo AUTO_INCREMENT = 174;
