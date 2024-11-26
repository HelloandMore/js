import input from './input.js';

/*2. feladat
Hozd létre az órarend programot, mely a heti órarend adatait tartalmazza.
Az adatokat tömbben és objectben tárold.
Írask ki a heti órarendet. */

const hours = ['8:00 - ', '8:55 - ', '9:55 - ', '10:50 - ', '11:45 - ', '12:45 - ', '13:40 - '];
let timetable = {
    'Hétfő': [],
    'Kedd': [],
    'Szerda': [],
    'Csütörtök': [],
    'Péntek': []
};

const keys = Object.keys(timetable);

for (let i = 0; i < keys.length; i++) {
    timetable[keys[i]] = hours;
}

// Kérjen be a felhasználótól az órarend adatait inputtal
for (let day in timetable) {
    console.log(day);
    for (let i = 0; i < timetable[day].length; i++) {
        timetable[day][i] = input(`Add meg a(z) ${day} ${i + 1}. óráját: `);
    }
}


for (let day in timetable) {
    console.log(day);
    for (let hour of timetable[day]) {
        console.log(`\t${hour}`);
    }
}
