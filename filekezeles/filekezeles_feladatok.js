import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'data.json');

// Function to read file content
function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Function to write content to file
function writeFile(content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8', (err) => {
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
        let data = await readFile();
        console.log('Original Content:', data);

        // Add three new data entries
        const newData = [{ name: 'David' }, { name: 'Eve' }, { name: 'Frank' }];
        data = data.concat(newData);

        // Write the updated content back to the file
        await writeFile(data);

        // Read the updated file content
        const updatedData = await readFile();
        console.log('Updated Content:', updatedData);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Execute the main function
updateFile();