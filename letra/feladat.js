const fs = require('fs');
const path = require('path');

// 1. feladat
// fájl beolvasása

const filePath = path.join(__dirname, 'lepesek.txt');

// Function to read file content
function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Function to write content to file
function writeToFile(content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Main function to read, update, and write file content
async function updateFile() {
    try {
        // Read the original file content
        let fileContent = await readFile();
        console.log(`1. feladat:\nDobások: ${fileContent}\n`);

        // Convert file content to array of numbers
        const dobasok = fileContent.split(', ').map(Number);

        // 2. feladat
        let jatekMenet = [];
        let aktualisMezo = 1;
        for (let i = 0; i < dobasok.length; i++) {
            if (aktualisMezo % 10 === 0) {
                aktualisMezo -= 3;
            }
            aktualisMezo += dobasok[i];
            jatekMenet.push(aktualisMezo);
        }
        console.log(`2. feladat\nMezők: ${jatekMenet.join(' ')}\n`);

        // 3. feladat
        let visszalepesekSzama = 0;
        let elorelepesekSzama = 0;
        for (let i = 0; i < jatekMenet.length; i++) {
            if (jatekMenet[i] % 10 === 0) {
                visszalepesekSzama++;
            }
            // ha 7, 17, 27 vagy 37-re lép
            else if (jatekMenet[i] % 10 === 7) {
                elorelepesekSzama++;
            }
        }
        console.log(`3. feladat\nA játék során ${visszalepesekSzama + elorelepesekSzama} alkalommal lépett létrára.\n`);

        // 4. feladat
        if (jatekMenet[jatekMenet.length - 1] >= 45) {
            console.log('4. feladat\nA játékot befejezte.');
        } else {
            console.log('4. feladat\nA játékot abbahagyta.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}


// randomize 18 numbers between 1 and 6
randomNumbers = [];
for (let i = 0; i < 18; i++) {
    randomNumbers.push(Math.floor(Math.random() * 6) + 1);
}
writeToFile(randomNumbers.join(', '))
    .then(() => writeToFile('\n'))
    .then(() => updateFile())
    .catch((err) => console.error(err));
updateFile();
// 5. feladat random 18 szám fájlhoz adása sortöréssel
for (let i = 0; i < 18; i++) {
    randomNumbers.push(Math.floor(Math.random() * 6) + 1);
}
writeToFile(randomNumbers.join(', '))
    .catch((err) => console.error(err));