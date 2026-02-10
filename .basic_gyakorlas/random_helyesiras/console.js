import { readFileSync, writeFileSync } from "fs";

// 1. Szo osztály létrehozása
class Szo {
  constructor(azon, szoto, szofaj, gyakori) {
    this.azon = parseInt(azon);
    this.szoto = szoto;
    this.szofaj = szofaj;
    this.gyakori = parseInt(gyakori);
  }
}

// 2. Adatok beolvasása a fájlból
function beolvasAdatok() {
  const adatok = [];
  const fileContent = readFileSync("szo10000.txt", "utf-8");
  const sorok = fileContent.split("\n");

  // Első sor a fejléc, azt kihagyjuk
  for (let i = 1; i < sorok.length; i++) {
    const sor = sorok[i].trim();
    if (sor) {
      const mezok = sor.split("\t");
      if (mezok.length === 4) {
        const szo = new Szo(mezok[0], mezok[1], mezok[2], mezok[3]);
        adatok.push(szo);
      }
    }
  }

  return adatok;
}

// 3. CSV fájl létrehozása
function letrehozCSV(adatok) {
  let csvTartalom = "azon,szoto,szofaj,gyakori\n";

  adatok.forEach((szo) => {
    csvTartalom += `${szo.azon},${szo.szoto},${szo.szofaj},${szo.gyakori}\n`;
  });

  writeFileSync("szo10000.csv", csvTartalom, "utf-8");
  console.log("szo10000.csv fájl létrehozva!");
}

// 4. Leggyakoribb 10-10 szótő szófajonként
function leggyakoribbSzofajonkent(adatok) {
  const szofajok = ["fn", "mn", "ige", "hsz"];
  let csvTartalom = "szofaj,szoto,gyakori\n";

  szofajok.forEach((szofaj) => {
    // Szűrés szófaj szerint
    const szurt = adatok.filter((s) => s.szofaj === szofaj);

    // Rendezés gyakoriság szerint csökkenő sorrendben
    szurt.sort((a, b) => b.gyakori - a.gyakori);

    // Első 10 elem
    const top10 = szurt.slice(0, 10);

    top10.forEach((szo) => {
      csvTartalom += `${szo.szofaj},${szo.szoto},${szo.gyakori}\n`;
    });
  });

  writeFileSync("leggyakoribb.csv", csvTartalom, "utf-8");
  console.log("leggyakoribb.csv fájl létrehozva!");
}

// Főprogram
console.log("Szógyakoriság elemzés indítása...\n");

const szavak = beolvasAdatok();
console.log(`Beolvasott szavak száma: ${szavak.length}\n`);

letrehozCSV(szavak);
leggyakoribbSzofajonkent(szavak);

console.log("\nKonzolos feladatok befejezve!");
