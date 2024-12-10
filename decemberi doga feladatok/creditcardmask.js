function maskify(cc) {
    if (cc.length <= 4) {
        return cc;
    }
    
    const maskedChars = cc.slice(0, -4).replace(/./g, '#');
    const lastFourChars = cc.slice(-4);
    
    return maskedChars + lastFourChars;
}


console.log(maskify('4556364607935616')); // '############5616'
console.log(maskify('1')); // '1'