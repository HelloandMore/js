import input from './input.js';
import fs from 'fs';
import path from 'path';

const filePath = path.join(path.dirname(import.meta.url.replace(/^file:\/\/\//, '')), 'uvegek.txt');

// Function to read file content
function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.trim().split(', ').map(Number));
            }
        });
    });
}

// Function to calculate the total volume of jars
function calculateTotalVolume(jars) {
    return jars.reduce((total, volume) => total + volume, 0);
}

// Function to find the largest jar and its position
function findLargestJar(jars) {
    let largestJar = jars[0];
    let largestJarIndex = 0;

    for (let i = 1; i < jars.length; i++) {
        if (jars[i] > largestJar) {
            largestJar = jars[i];
            largestJarIndex = i;
        }
    }

    return { volume: largestJar, position: largestJarIndex + 1 };
}

// Main function
async function main() {
    try {
        // Read the jar volumes from the file
        const jars = await readFile();

        // Task 1: Store the jar volumes in an appropriate data structure
        console.log('1. feladat');
        console.log('Üvegek:', jars);

        // Task 2: Prompt the user for the amount of jam cooked by Mari néni
        const cookedJam = await input("Hány dl lekvárt készített Mari néni? > "); // Replace with user input
        console.log('2. feladat');
        console.log('Mari néni lekvárja (dl):', cookedJam);

        // Task 3: Find the largest jar and its position
        const largestJar = findLargestJar(jars);
        console.log('3. feladat');
        console.log('A legnagyobb üveg:', largestJar.volume + ' dl', 'és', largestJar.position + '. a sorban.');

        // Task 4: Check if the cooked jam fits in the jars
        const totalVolume = calculateTotalVolume(jars);
        const enoughJars = totalVolume >= cookedJam;
        console.log('4. feladat');
        if (enoughJars) {
            console.log('Elegendő üveg volt.');
        } else {
            console.log('Maradt lekvár.');
        }
    } catch (err) {
        console.error('Hiba:', err);
    }
}

// Execute the main function
main();