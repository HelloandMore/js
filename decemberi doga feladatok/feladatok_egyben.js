function timeConvert(minutes) {
    if (minutes <= 0) {
        return "00:00";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = remainingMinutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
}

function isTriangle(a, b, c) {
    if (a <= 0 || b <= 0 || c <= 0) {
        return false;
    }

    if (a + b > c && b + c > a && c + a > b) {
        return true;
    }

    return false;
}

function numToDigitTiers(number) {
    const numberString = number.toString();
    const tiers = [];

    for (let i = 0; i < numberString.length; i++) {
        tiers.push(numberString.slice(0, i + 1));
    }

    return tiers;
}

function maskify(cc) {
    if (cc.length <= 4) {
        return cc;
    }
    
    const maskedChars = cc.slice(0, -4).replace(/./g, '#');
    const lastFourChars = cc.slice(-4);
    
    return maskedChars + lastFourChars;
}

console.log(timeConvert(78)); // Output: 01:18
console.log(timeConvert(0)); // Output: 00:00
console.log(timeConvert(120)); // Output: 02:00
console.log(timeConvert(59)); // Output: 00:59

console.log(isTriangle(1, 2, 2)); // true
console.log(isTriangle(7, 2, 2)); // false
console.log(isTriangle(0, 2, 3)); // false
console.log(isTriangle(1, 2, 3)); // false
console.log(isTriangle(1, 1, 1)); // true

console.log(numToDigitTiers(1234)); // ['1', '12', '123', '1234']
console.log(numToDigitTiers(910)); // ['9', '91', '910']
console.log(numToDigitTiers(0)); // ['0']
console.log(numToDigitTiers(1)); // ['1']

console.log(maskify('4556364607935616')); // '############5616'
console.log(maskify('1')); // '1'