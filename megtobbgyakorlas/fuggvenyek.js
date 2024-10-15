const sum = (a, b) => a + b;

const subtraction = (a, b) => a - b;

const multiplication = (a, b) => a * b;

const division = (a, b) => a / b;

const calc = (a, b, fn) => fn(a, b);

console.log(sum(1, 2)); // 3
console.log(subtraction(1, 2)); // -1
console.log(multiplication(1, 2)); // 2
console.log(division(1, 2)); // 0.5
console.log(calc(1, 2, sum)); // 3