// 1. Sum Arrays
num sum(List<num> arr) {
  return arr.isEmpty ? 0 : arr.reduce((a, b) => a + b);
}

// 2. Odd Ones Out
List<int> oddOnesOut(List<int> nums) {
  Map<int, int> frequency = {};
  for (var num in nums) {
    frequency[num] = (frequency[num] ?? 0) + 1;
  }
  return nums.where((num) => frequency[num]! % 2 == 0).toList();
}

void main() {
  // 1. Sum Arrays
  print(sum([])); // -> 0
  print(sum([5])); // -> 5
  print(sum([-5])); // -> -5
  print(sum([1, 2, 3.4, 4.3])); // -> 10.7
  print(sum([1, -3, 2, 3, 4, -1])); // -> 6

  // 2. Odd Ones Out
  print(oddOnesOut([1, 2, 3, 1, 3, 3])); // -> [1, 1]
  print(oddOnesOut([75, 68, 75, 47, 68])); // -> [75, 68, 75, 68]
  print(oddOnesOut([42, 72, 32, 4, 94, 82, 67, 67])); // -> [67, 67]
  print(oddOnesOut([100, 100, 5, 5, 100, 50, 68, 50, 68, 50, 68, 5, 100])); // -> [100, 100, 100, 100]
  print(oddOnesOut([82, 86, 71, 58, 44, 79, 50, 44, 79, 67, 82, 82, 55, 50])); // -> [50, 44, 79, 50]
}