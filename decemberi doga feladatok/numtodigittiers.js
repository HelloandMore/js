function numToDigitTiers(number) {
    const numberString = number.toString();
    const tiers = [];

    for (let i = 0; i < numberString.length; i++) {
        tiers.push(numberString.slice(0, i + 1));
    }

    return tiers;
}

console.log(numToDigitTiers(1234)); // ['1', '12', '123', '1234']
console.log(numToDigitTiers(910)); // ['9', '91', '910']
console.log(numToDigitTiers(0)); // ['0']
console.log(numToDigitTiers(1)); // ['1']