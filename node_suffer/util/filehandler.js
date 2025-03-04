import fs from "fs";
//import path from "path";
import __dirname from './rootpath.js';

const filePath = "data/users.json"

// JSON fájl olvasása
export const getData = () => {
    try {
        const content = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(content);
        return data;
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return [];
    }
};

// JSON fájlba írása
export const saveData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
};