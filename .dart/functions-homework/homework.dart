// Functions Homework - Dart Implementation

void main() {
  // Minden függvény tesztelése
  print('=== Függvények Tesztelése ===');
  
  // Faktoriális teszt
  print('1. Faktoriális tesztek:');
  print('factorial(5) = ${factorial(5)}');
  print('factorial(0) = ${factorial(0)}');
  print('factorial(1) = ${factorial(1)}');
  
  // Oszthatóság teszt
  print('\n2. Oszthatóság tesztek:');
  print('isDivisible(10, 2) = ${isDivisible(10, 2)} (10 osztható 2-vel)');
  print('isDivisible(10, 3) = ${isDivisible(10, 3)} (10 nem osztható 3-mal)');
  print('isDivisible(15, 5) = ${isDivisible(15, 5)} (15 osztható 5-tel)');
  
  // Százalék teszt
  print('\n3. Százalék tesztek:');
  print('percent(100, 75) = ${percent(100, 75)}% (75 a 100-nak hány százaléka)');
  print('percent(200, 50) = ${percent(200, 50)}% (50 a 200-nak hány százaléka)');
  print('percent(80, 20) = ${percent(80, 20)}% (20 a 80-nak hány százaléka)');
  
  // Jegy teszt
  print('\n4. Jegy tesztek:');
  print('grade(100, 95) = ${grade(100, 95)} (95/100 pont = ${percent(100, 95)}%)');
  print('grade(100, 80) = ${grade(100, 80)} (80/100 pont = ${percent(100, 80)}%)');
  print('grade(100, 65) = ${grade(100, 65)} (65/100 pont = ${percent(100, 65)}%)');
  print('grade(100, 50) = ${grade(100, 50)} (50/100 pont = ${percent(100, 50)}%)');
  print('grade(100, 30) = ${grade(100, 30)} (30/100 pont = ${percent(100, 30)}%)');
  
  // Magánhangzó teszt
  print('\n5. Magánhangzó nagybetűsítés tesztek:');
  print('vowelUpper("hello world") = "${vowelUpper("hello world")}"');
  print('vowelUpper("programming") = "${vowelUpper("programming")}"');
  print('vowelUpper("AEIOU") = "${vowelUpper("AEIOU")}"');
  
  // Gauss összeg teszt
  print('\n6. Gauss összeg tesztek:');
  print('gausSum(4) = ${gausSum(4)} (1+2+3+4)');
  print('gausSum(10) = ${gausSum(10)} (1+2+...+10)');
  print('gausSum(1) = ${gausSum(1)} (csak 1)');
  
  // Gauss lista teszt
  print('\n7. Gauss lista tesztek:');
  print('gausList(4) = ${gausList(4)} (1, 1+2, 1+2+3, 1+2+3+4)');
  print('gausList(6) = ${gausList(6)}');
  print('gausList(1) = ${gausList(1)}');
}

// 1. Faktoriális számítás
int factorial(int number) {
  if (number < 0) {
    throw ArgumentError('A faktoriális nem értelmezhető negatív számokra');
  }
  if (number == 0 || number == 1) {
    return 1;
  }
  
  int result = 1;
  for (int i = 2; i <= number; i++) {
    result *= i;
  }
  return result;
}

// 2. Oszthatóság ellenőrzése
bool isDivisible(int integer1, int integer2) {
  if (integer2 == 0) {
    throw ArgumentError('Nullával való osztás nem megengedett');
  }
  return integer1 % integer2 == 0;
}

// 3. Százalék számítás
double percent(double total, double score) {
  if (total == 0) {
    throw ArgumentError('A total nem lehet nulla');
  }
  double percentage = (score / total) * 100;
  return double.parse(percentage.toStringAsFixed(2));
}

// 4. Jegy meghatározása
String grade(double total, double points) {
  double percentage = percent(total, points);
  
  if (percentage >= 90) {
    return 'A';
  } else if (percentage >= 75) {
    return 'B';
  } else if (percentage >= 60) {
    return 'C';
  } else if (percentage >= 45) {
    return 'D';
  } else {
    return 'E';
  }
}

// 5. Magánhangzók nagybetűsítése
String vowelUpper(String text) {
  const vowels = 'aeiouAEIOU';
  String result = '';
  
  for (int i = 0; i < text.length; i++) {
    String char = text[i];
    if (vowels.contains(char)) {
      result += char.toUpperCase();
    } else {
      result += char.toLowerCase();
    }
  }
  
  return result;
}

// 6. Gauss összeg (1-től n-ig)
int gausSum(int number) {
  if (number < 1) {
    throw ArgumentError('A szám pozitívnak kell lennie');
  }
  
  int sum = 0;
  for (int i = 1; i <= number; i++) {
    sum += i;
  }
  return sum;
}

// 7. Gauss összegek listája
List<int> gausList(int number) {
  if (number < 1) {
    throw ArgumentError('A szám pozitívnak kell lennie');
  }
  
  List<int> result = [];
  int sum = 0;
  
  for (int i = 1; i <= number; i++) {
    sum += i;
    result.add(sum);
  }
  
  return result;
}
