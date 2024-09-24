let text = 'My favorite number is 42.';

console.log(text.charAt(3));
console.log(text.at(-3));

// slice substring
console.log(text.slice(7, 12));
console.log(text.substring(7, 12));
console.log(text.substring(12, 7));

// concat example
let text1 = 'Hello';
let text2 = 'World';
let text3 = text1.concat(' ', text2);
console.log(text3);

// upper example
let text4 = 'Hello World!';
console.log(text4.toUpperCase());

// trim example
let text5 = '   Hello World!   ';
console.log(text5.trim());

// pad example
let text6 = '5';
console.log(text6.padStart(4, 0));

// repeat example
let text7 = 'Hello World!';
console.log(text7.repeat(10));