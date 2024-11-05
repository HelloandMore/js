const numbers = [2,13,3,7,17,5,11,19,9];
const names = ['Eva', 'Adel', 'Cedric', 'Dior', 'Frank', 'Bob'];
const fruits = ['pineapple', 'kiwi', 'banana', 'pear', 'cherry'];

function sortByLength(arr) {
    return arr.sort((a, b) => a.length - b.length);
}

function sortByLengthAsc(arr) {
    return arr.sort((a, b) => {
        if (a.length === b.length) {
            return a.localeCompare(b);
        }
        return a.length - b.length;
    });
}

function sortFrom15(arr) {
    return arr.sort((a, b) => Math.abs(a - 15) - Math.abs(b - 15));
}

function addAsterisk(arr) {
    return arr.map(item => `*${item}*`);
}

function between5And15(arr) {
    return arr.filter(item => item >= 5 && item <= 15);
}

function isAllOdd(arr) {
    return arr.every(item => item % 2 !== 0);
}

function hasEven(arr) {
    return arr.some(item => item % 2 === 0);
}

function sigma(arr) {
    return arr.reduce((total, item) => total * item);
}

const sortedByLength = sortByLength(names);
const sortedByLengthAsc = sortByLengthAsc(fruits);
const sortedFrom15 = sortFrom15(numbers);
const asteriskAdded = addAsterisk(names);
const between5And15Arr = between5And15(numbers);
const isAllOddResult = isAllOdd(numbers);
const hasEvenResult = hasEven(numbers);
const sigmaResult = sigma(numbers);

console.log(sortedByLength);
console.log(sortedByLengthAsc);
console.log(sortedFrom15);
console.log(asteriskAdded);
console.log(between5And15Arr);
console.log(isAllOddResult);
console.log(hasEvenResult);
console.log(sigmaResult);