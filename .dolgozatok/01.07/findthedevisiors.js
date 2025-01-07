function divisors(n) {
    let result = [];
    
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            result.push(i);
        }
    }
    
    if (result.length === 0) {
        return `${n} is prime`;
    }
    
    return result;
}

console.log(divisors(12)); //== [2, 3, 4, 6]
console.log(divisors(25)); //== [5]
console.log(divisors(13)); //== "13 is prime"