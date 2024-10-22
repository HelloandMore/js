function divisors(number) {
    let divisorsArray = [];
    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            divisorsArray.push(i);
        }
    }
    return divisorsArray;
}

// Példák
console.log(divisors(4)); // [1, 2, 4]