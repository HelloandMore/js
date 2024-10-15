function fizzbuzz(number) {
    if (number % 3 === 0 && number % 5 === 0) {
        return 'fizzbuzz';
    } else if (number % 3 === 0) {
        return 'fizz';
    } else if (number % 5 === 0) {
        return 'buzz';
    } else {
        return number;
    }
}

// Példák
console.log(fizzbuzz(1)); // 1
console.log(fizzbuzz(3)); // "fizz"
console.log(fizzbuzz(5)); // "buzz"
console.log(fizzbuzz(15)); // "fizzbuzz"