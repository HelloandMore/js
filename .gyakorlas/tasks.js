import input from "./input.js";

// Task 1
let length = await input("Add meg a hosszt > "), width = await input("Add meg a szélességet > "), height = await input("Add meg a magasságot > ");
let volume = length * width * height;
let area = 2 * (length * width + length * height + width * height);

console.log(`The volume of the box is ${Math.round(volume)} cubic units.`);
console.log(`The surface area of the box is ${Math.round(area)} square units.`);

// Task 2
let mass_in_kg = await input("Add meg a súlyt kg-ban > "), height_in_m = await input("Add meg a magasságot méterben > ");
let bmi = mass_in_kg / (height_in_m * height_in_m);

console.log(`The BMI is ${Math.round(bmi)}.`);

// Task 3
let year = await input("Add meg az évet > ");
let isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

console.log(isLeap ? "A megadott év szökőév." : "A megadott év nem szökőév.");

// Task 4
number = parseInt(await input("Adj meg egy számot > "));
let factorial = 1;
for (let i = 1; i <= number; i++) {
    factorial *= i;
}

console.log(`The factorial of ${number} is ${factorial}.`);

// Task 5
let size = await input("Add meg a négyzet méretét > ");
let square = '';
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || i === j) {
            square += '%';
        } else {
            square += ' ';
        }
    }
    square += '\n';
}

console.log(square);

// Task 6
result = [];
    let skipCount = 1;
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0) {
            if (skipCount === 1) skipCount++;
            else skipCount = 1;
        } else {
            result.push(i);
        }
    }

    console.log(result.join(', '));

// Task 7
let currentDate = new Date();
let currentHours = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();
let currentSeconds = currentDate.getSeconds();
let totalSeconds = 24 * 3600;
let elapsedSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;
let remaining = totalSeconds - elapsedSeconds;

console.log(`The remaining time from the day is ${Math.floor(remaining / 3600)} hours, ${Math.floor((remaining % 3600) / 60)} minutes and ${remaining % 60} seconds long.`);

// Task 8
let score = await input("Add meg az amerikán kívüli jegyed > ");
let grade;
if (score >= 90) grade = 'A';
else if (score >= 80) grade = 'B';
else if (score >= 70) grade = 'C';
else if (score >= 60) grade = 'D';
else grade = 'F';

console.log(`The grade is ${grade}.`);

// Task 9
let player1 = await input("Add meg az első játékos választását (1: kő, 2: papír, 3: olló) > ");
let player2 = await input("Add meg a második játékos választását (1: kő, 2: papír, 3: olló) > ");
result;
if (player1 === player2) result = "It's a tie.";
else if ((player1 == 1 && player2 == 3) || (player1 == 2 && player2 == 1) || (player1 == 3 && player2 == 2)) result = "Player 1 wins.";
else result = "Player 2 wins.";

console.log(result);

// Task 10
str = await input("Add meg a szöveget > ");
result = '';
for (let char of str) {
    result += `${char}\n`;
}

console.log(result);

// Task 11
let number = await input("Add meg a számot, aminek az átlagát tudni akarod > ");
let digits = number.toString().split('').map(Number);
let average = digits.reduce((a, b) => a + b) / digits.length;

console.log(`The average of the digits is ${average}.`);

// Task 12
let str = await input("Add meg a szöveget > ");
result = '';
for (let char of str) {
    if (!/[a-zA-Z]/.test(char)) break;
    result += char + '\n';
}

console.log(result)

// Task 13
result = '';
for (let i = 10; i <= 30; i++) {
    result += `${i}: `;
    for (let j = 1; j <= i; j++) {
        if (i % j === 0) result += `${j}, `;
    }
    result += '\n';
}

console.log(result)

// Task 14 
result = '';
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        result += 'fizzbuzz, ';
    } else if (i % 3 === 0) {
        result += 'fizz, ';
    } else if (i % 5 === 0) {
        result += 'buzz, ';
    } else {
        result += `${i}, `;
    }
}

result = result.slice(0, -2);
console.log(result);