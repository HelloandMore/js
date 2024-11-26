function myParseInt(str) {
    // Trim leading and trailing spaces
    str = str.trim();

    // Check if the string is a valid integer
    if (/^\d+$/.test(str)) {
        return parseInt(str);
    } else {
        return NaN;
    }
}

// Examples
console.log(myParseInt('5')); // 5
console.log(myParseInt('  5')); // 5
console.log(myParseInt('5  ')); // 5
console.log(myParseInt('  5  ')); // 5
console.log(myParseInt('5a')); // NaN
console.log(myParseInt('a5')); // NaN