function threeRuls() {
    let result = [];
    let count = 0;
    
    for (let i = 1; i <= 50; i++) {
        if (count === 3) {
            count = 0;
        }
        
        if (i % 3 !== 0 || count !== 0) {
            result.push(i);
        }
        
        if (i % 3 === 0) {
            count++;
        }
    }
    
    return result;
}

// Példák

console.log(threeRuls()); // [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25, 26, 28, 29, 31, 32, 34, 35, 37, 38, 40, 41, 43, 44, 46, 47, 49, 50]