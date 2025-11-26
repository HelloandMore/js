void main() {
  // 1. FizzBuzzNumbers
  List<int> numbers = [2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 17, 19, 21];
  List<int> fizzBuzzNumbers = numbers.where((n) => n % 3 == 0 || n % 5 == 0).toList();
  print("FizzBuzzNumbers: $fizzBuzzNumbers");

  // 2. MyDays
  List<String> days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  List<String> myDays = days.where((day) => day.contains('o') || day.contains('ur')).toList();
  print("MyDays: $myDays");

  // 3. NumberMarks
  Set<dynamic> scores = {"A", "B", 3, 5, 4, "D", "F", 2, 1, "E", "C"};
  List<int> numberMarks = scores.where((score) => score is int).cast<int>().toList()..sort();
  print("NumberMarks: $numberMarks");

  // 4. Top 3 GDP
  Map<String, double> gdpPerPerson = {
    "United States": 63051.40,
    "China": 10500.00,
    "Japan": 42659.70,
    "Germany": 46703.00,
    "United Kingdom": 42330.00,
    "India": 2100.00,
    "France": 41463.64,
    "Canada": 46212.10
  };
  List<double> top3GDP = gdpPerPerson.values.toList()..sort((a, b) => b.compareTo(a));
  print("Top 3 GDP: ${top3GDP.take(3).toList()}");
}