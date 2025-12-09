void main() {
  // Segédfüggvény: visszaadja a fizz/buzz/fizzbuzz stringet, vagy null-t ha nincs.
  String? fizzBuzzText(int n) {
    final divisibleBy3 = n % 3 == 0;
    final divisibleBy5 = n % 5 == 0;
    if (divisibleBy3 && divisibleBy5) return 'fizzbuzz';
    if (divisibleBy3) return 'fizz';
    if (divisibleBy5) return 'buzz';
    return null;
  }

  // 1) fizzbuzz lista 1..100 (minden elem String: 'fizz'/'buzz'/'fizzbuzz' vagy maga a szám)
  final List<String> fizzbuzzList = List.generate(100, (i) {
    final n = i + 1;
    return fizzBuzzText(n) ?? n.toString();
  });

  print('--- 1) fizzbuzz lista ---');
  print(fizzbuzzList);
  print(''); // üres sor

  // 2) oddEven lista: a fizzbuzz lista elemeit tartalmazza, de a páratlan számok helyén 'odd', a páros helyén 'even'
  final List<String> oddEven = List.generate(100, (i) {
    final n = i + 1;
    return (n % 2 == 1) ? 'odd' : 'even';
  });

  print('--- 2) oddEven lista ---');
  print(oddEven);
  print('');

  // 3) oddSet: a fizzbuzz lista elemei, kivéve a párosakat (tehát csak az odd indexű számok elemei kerülnek a set-be)
  // Megjegyzés: Set kiküszöböli az ismétlődéseket automatikusan.
  final Set<String> oddSet = {};
  for (var i = 0; i < 100; i++) {
    final n = i + 1;
    if (n % 2 == 1) {
      oddSet.add(fizzbuzzList[i]);
    }
  }

  print('--- 3) oddSet (csak páratlan helyű elemek a fizzbuzz listából) ---');
  print(oddSet);
  print('');

  // 4) fizzBuzzMap: kulcsok 1..100. A value egy lista, mely tartalmazza:
  //    - maga a szám (String formában),
  //    - ha fizz/buzz/fizzbuzz akkor a szöveges megfelelőjét (külön elemként),
  //    - 'odd' vagy 'even'
  final Map<int, List<String>> fizzBuzzMap = {};
  for (var n = 1; n <= 100; n++) {
    final List<String> values = [];
    values.add(n.toString()); // maga a szám
    final fb = fizzBuzzText(n);
    if (fb != null) values.add(fb); // csak akkor adjuk hozzá, ha van fizz/buzz/fizzbuzz
    values.add((n % 2 == 1) ? 'odd' : 'even'); // páratlan/páros jelzés
    fizzBuzzMap[n] = values;
  }

  print('--- 4) fizzBuzzMap elempárok (soronként) ---');
  fizzBuzzMap.forEach((key, valueList) {
    print('$key: ${valueList.join(', ')}');
  });
}
