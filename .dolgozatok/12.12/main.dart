num sum(List<num> arr) {
  return arr.isEmpty ? 0 : arr.reduce((a, b) => a + b);
}

List<int> oddOnesOut(List<int> nums) {
  Map<int, int> frequency = {};
  for (var num in nums) {
    frequency[num] = (frequency[num] ?? 0) + 1;
  }
  return nums.where((num) => frequency[num]! % 2 == 0).toList();
}

List<int> flattenAndSort(List<List<int>> nums) {
  List<int> flattened = [];
  for (var sublist in nums) {
    flattened.addAll(sublist);
  }
  flattened.sort();
  return flattened;
}

int duplicateCount(String text) {
  String lowerText = text.toLowerCase();
  Map<String, int> frequency = {};

  for (var char in lowerText.split('')) {
    frequency[char] = (frequency[char] ?? 0) + 1;
  }

  return frequency.values.where((count) => count > 1).length;
}

void testFlattenAndSort() {
  print(flattenAndSort([]));
  print(flattenAndSort([[]]));
  print(flattenAndSort([[], []]));
  print(
    flattenAndSort([
      [],
      [1],
    ]),
  );
  print(
    flattenAndSort([
      [],
      [],
      [],
      [2],
      [],
      [1],
    ]),
  );
  print(
    flattenAndSort([
      [1, 3, 5],
      [100],
      [2, 4, 6],
    ]),
  );
  print(
    flattenAndSort([
      [111, 999],
      [222],
      [333],
      [444],
      [888],
      [777],
      [666],
      [555],
    ]),
  );
  print(
    flattenAndSort([
      [9, 7, 5, 3, 1],
      [8, 6, 4, 2, 0],
      [],
      [1],
    ]),
  );
  print(
    flattenAndSort([
      [1],
      [],
      [1],
      [],
      [],
      [-1, -2, -1],
      [0, 3],
      [1],
      [2],
    ]),
  );
  print(
    flattenAndSort([
      [],
      [],
      [64],
      [],
      [504, 503],
      [4096],
      [],
      [303],
      [202],
      [2500],
      [],
      [100],
    ]),
  );
  print(
    flattenAndSort([
      [90, 81, 72],
      [63, 54, 35],
      [],
      [46],
      [27, 18, 0],
    ]),
  );
  print(
    flattenAndSort([
      [1],
      [],
      [1],
      [1],
      [0],
      [-1],
      [],
      [0],
      [-1],
      [0],
      [-1],
    ]),
  );
  print(
    flattenAndSort([
      [-9, -8, -7, -6, -5, -4, -3, -2, -1],
    ]),
  );
  print(
    flattenAndSort([
      [9, 8, 7, 6, 5, 4, 3, 2, 1],
    ]),
  );
}

void testDuplicateCount() {
  print(duplicateCount(""));
  print(duplicateCount("abcde"));
  print(duplicateCount("aabbcde"));
  print(duplicateCount("aabBcde"));
  print(duplicateCount("Indivisibility"));
}

void testAll() {
  print(sum([]));
  print(sum([5]));
  print(sum([-5]));
  print(sum([1, 2, 3.4, 4.3]));
  print(sum([1, -3, 2, 3, 4, -1]));

  print(oddOnesOut([1, 2, 3, 1, 3, 3]));
  print(oddOnesOut([75, 68, 75, 47, 68]));
  print(oddOnesOut([42, 72, 32, 4, 94, 82, 67, 67]));
  print(oddOnesOut([100, 100, 5, 5, 100, 50, 68, 50, 68, 50, 68, 5, 100]));

  print(oddOnesOut([82, 86, 71, 58, 44, 79, 50, 44, 79, 67, 82, 82, 55, 50]));
  testFlattenAndSort();
  testDuplicateCount();
}

void main() {
  testAll();
}
