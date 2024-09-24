// Task 1: Cuboid Surface Area and Volume
function calculateCuboid() {
    let a = 10.4, b = 13.5, c = 8.2;
    let surfaceArea = 2 * (a * b + b * c + c * a);
    let volume = a * b * c;
    document.getElementById("cuboidResult").innerText = `Surface Area: ${surfaceArea.toFixed(2)}, Volume: ${volume.toFixed(2)}`;
}
calculateCuboid();

// Task 2: BMI Calculator
function calculateBMI() {
    let mass_in_kg = 81.2, height_in_m = 1.78;
    let bmi = mass_in_kg / (height_in_m * height_in_m);
    document.getElementById("bmiResult").innerText = `BMI: ${bmi.toFixed(2)}`;
}
calculateBMI();

// Task 3: Leap Year Checker
function checkLeapYear() {
    let year = parseInt(document.getElementById("yearInput").value);
    let isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    document.getElementById("leapYearResult").innerText = isLeap ? `${year} is a leap year.` : `${year} is not a leap year.`;
}

// Task 4: Factorial Calculator
function calculateFactorial() {
    let number = parseInt(document.getElementById("factorialInput").value);
    let factorial = 1;
    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }
    document.getElementById("factorialResult").innerText = `${number} factorial is ${factorial}.`;
}

// Task 5: Draw Square with Diagonal
function drawSquare() {
    let size = parseInt(document.getElementById("squareSize").value);
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
    document.getElementById("squareResult").innerText = square;
}

// Task 6: Numbers from 1 to 100 (Skip Some Divisible by 3)
function skipDivisibleBy3() {
    let result = [];
    let skipCount = 1;
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0) {
            if (skipCount === 1) skipCount++;
            else skipCount = 1;
        } else {
            result.push(i);
        }
    }
    document.getElementById("numbersResult").innerText = result.join(', ');
}
skipDivisibleBy3();

// Task 7: Remaining Seconds in the Day
function remainingSeconds() {
    let currentDate = new Date();
    let currentHours = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();
    let currentSeconds = currentDate.getSeconds();
    let totalSeconds = 24 * 3600;
    let elapsedSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;
    let remaining = totalSeconds - elapsedSeconds;
    document.getElementById("remainingSecondsResult").innerText = `Remaining seconds: ${remaining}`;
}
remainingSeconds();

// Task 8: Letter Grade
function printLetterGrade() {
    let score = parseInt(document.getElementById("scoreInput").value);
    let grade;
    if (score >= 90) grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';
    else grade = 'F';
    document.getElementById("gradeResult").innerText = `Grade: ${grade}`;
}

// Task 9: Rock, Paper, Scissors
function rockPaperScissors() {
    let player1 = parseInt(document.getElementById("player1Input").value);
    let player2 = parseInt(document.getElementById("player2Input").value);
    let result;
    if (player1 === player2) result = "It's a tie.";
    else if ((player1 === 1 && player2 === 3) || (player1 === 2 && player2 === 1) || (player1 === 3 && player2 === 2)) result = "Player 1 wins.";
    else result = "Player 2 wins.";
    document.getElementById("rpsResult").innerText = result;
}

// Task 10: Print Letters of a String
function printLetters() {
    let str = document.getElementById("myString").value;
    let result = '';
    for (let char of str) {
        result += `${char}\n`;
    }
    document.getElementById("lettersResult").innerText = result;
}

// Task 11: Average of Digits
function averageOfDigits() {
    let number = parseInt(document.getElementById("digitInput").value);
    let digits = number.toString().split('').map(Number);
    let average = digits.reduce((a, b) => a + b) / digits.length;
    document.getElementById("averageResult").innerText = `Average of digits: ${average}`;
}

// Task 12: Print Letters Until Non-letter
function printUntilNonLetter() {
    let str = document.getElementById("letterString").value;
    let result = '';
    for (let char of str) {
        if (!/[a-zA-Z]/.test(char)) break;
        result += char + '\n';
    }
    document.getElementById("nonLetterResult").innerText = result;
}

// Task 13: Divisors from 10 to 30
function printDivisors() {
    let result = '';
    for (let i = 10; i <= 30; i++) {
        result += `${i}: `;
        for (let j = 1; j <= i; j++) {
            if (i % j === 0) result += `${j}, `;
        }
        result += '\n';
    }
    document.getElementById("divisorsResult").innerText = result;
}
printDivisors();
