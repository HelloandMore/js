function disemvowel(str) {
    return str.replace(/[aeiou]/gi, '');
}

// Examples
console.log(disemvowel('This website is for losers LOL!')); // Ths wbst s fr lsrs LL!
console.log(disemvowel('No offense but,\nYour writing is among the worst I\'ve ever read')); // N ffns bt,\nYr wrtng s mng th wrst \'v vr rd
