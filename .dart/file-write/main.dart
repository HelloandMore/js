import 'dart:io';

void main() async {
    // 1. Sample fájlok létrehozása
    await File('sample.txt').create();
    await File('sample.csv').create();
    print('sample.txt és sample.csv létrehozva');

    // 2. school.txt létrehozása és adatok írása
    var schoolFile = File('school.txt');
    await schoolFile.writeAsString('''Szegedi SZC Vasvári Pál Gazdasági és Informatikai Technikum\n6722\nGutenberg u. 11.\nSzeged
''');
    print('school.txt létrehozva és adatok beírva');

    // 3. Osztály nevének hozzáfűzése
    await schoolFile.writeAsString('\n13.B osztály', mode: FileMode.append);
    print('Osztály neve hozzáfűzve');

    // 4. students.csv létrehozása és adatok bekérése
    var studentsFile = File('students.csv');
    
    print('\nDiák adatok megadása (üres vezetéknév esetén kilépés):');
    while (true) {
        stdout.write('Vezetéknév: ');
        var vezeteknev = stdin.readLineSync() ?? '';
        if (vezeteknev.isEmpty) break;
        
        stdout.write('Keresztnév: ');
        var keresztnev = stdin.readLineSync() ?? '';
        
        stdout.write('Településnév: ');
        var telepules = stdin.readLineSync() ?? '';
        
        await studentsFile.writeAsString(
            '$vezeteknev,$keresztnev,$telepules\n',
            mode: FileMode.append
        );
        print('Adat mentve!\n');
    }

    // 5. CSV fájl beolvasása és kiírása új sorrendben
    if (await studentsFile.exists()) {
        print('\nDiákok listája (település, vezetéknév, keresztnév):');
        var lines = await studentsFile.readAsLines();
        
        for (var line in lines) {
            if (line.trim().isEmpty) continue;
            var parts = line.split(',');
            if (parts.length == 3) {
                print('${parts[2]}, ${parts[0]}, ${parts[1]}');
            }
        }
    }
}