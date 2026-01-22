function solve(table) {
  const A = table[0][0];
  const B = table[0][2];
  const C = table[2][0];
  const D = table[2][2];
  
  if (table[0][1] !== A + B) return [-1];
  if (table[1][0] !== A + C) return [-1];
  if (table[1][2] !== B + D) return [-1];
  if (table[2][1] !== C + D) return [-1];
  if (table[1][1] !== A + B + C + D) return [-1];
  
  return [A, B, C, D];
}

console.log(solve([[1,2,1], [2,4,2], [1,2,1]])); // Expected: [1,1,1,1]
console.log(solve([[3,7,4], [5,16,11], [2,9,7]])); // Expected: [3,4,2,7]
