import 'dart:io';

// 1. Írasd ki a TXT fájl tartalmát egyben, egy szövegként
Future<void> printWholeContent(String filename) async {
  final file = File(filename);
  final content = await file.readAsString();
  print('1. Teljes tartalom egy szövegként:');
  print(content);
  print('');
}

// 2. Írasd ki soronként (írasd ki, hogy hanyadik sor)
Future<void> printLineByLine(String filename) async {
  final file = File(filename);
  final lines = await file.readAsLines();
  print('2. Soronként:');
  for (int i = 0; i < lines.length; i++) {
    print('${i + 1}. sor: ${lines[i].trim()}');
  }
  print('');
}

// 3. Csak az 1. sort
Future<void> printFirstLine(String filename) async {
  final file = File(filename);
  final lines = await file.readAsLines();
  if (lines.isNotEmpty) {
    print('3. Csak az első sor:');
    print(lines[0].trim());
  }
  print('');
}

// 4. Csak az utolsó sort (írasd ki, hogy hanyadik sor)
Future<void> printLastLine(String filename) async {
  final file = File(filename);
  final lines = await file.readAsLines();
  if (lines.isNotEmpty) {
    print('4. Csak az utolsó sor:');
    print('${lines.length}. sor: ${lines.last.trim()}');
  }
  print('');
}

// 5. Egy tömbben (listában), melynek elemei a sorok
Future<List<String>> getLinesAsArray(String filename) async {
  final file = File(filename);
  final lines = await file.readAsLines();
  return lines.map((line) => line.trim()).toList();
}

// 6. Egy tömbben (listában), mely a sor szavainak tömbjét (listáját) tartalmazza
Future<List<List<String>>> getLinesAsWordsArray(String filename) async {
  final file = File(filename);
  final lines = await file.readAsLines();
  return lines.map((line) => line.trim().split(' ')).toList();
}

void main() async {
  final filename = 'test.txt';

  // 1. Teljes tartalom
  await printWholeContent(filename);

  // 2. Soronként
  await printLineByLine(filename);

  // 3. Első sor
  await printFirstLine(filename);

  // 4. Utolsó sor
  await printLastLine(filename);

  // 5. Lista a sorokkal
  final linesArray = await getLinesAsArray(filename);
  print('5. Sorok listában:');
  print(linesArray);
  print('');
  // 6. Lista a sorok szavainak listáival
  final wordsArray = await getLinesAsWordsArray(filename);
  print('6. Sorok szavainak listája:');
  for (int i = 0; i < wordsArray.length; i++) {
    print('${i + 1}. sor szavai: ${wordsArray[i]}');
  }
}
