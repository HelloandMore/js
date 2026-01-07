import 'dart:io';

void main() {
  File file = File('felszin_tpont.txt');
  List<Map<String, Object>> kraterek = [];
  List<String> fileTartalom = file.readAsLinesSync();
  for (var sor in fileTartalom) {
    List<String> adat = sor.split('\t');
    kraterek.add({
      'x': double.tryParse(adat[0])!,
      'y': double.tryParse(adat[1])!,
      'r': double.tryParse(adat[2])!,
      'nev': adat[3],
    });
  }
  print('1. feladat: ${kraterek.toString()}');

  print('2. feladat: A kráterek száma: ${kraterek.length} db');

  print('3. feladat: Kérem egy kráter nevét: ');
  String? kraterNev = stdin.readLineSync();
  String visszaJelzes = 'Nincs ilyen nevű kráter';

  for (var kreater in kraterek) {
    if (kreater['nev'] == kraterNev) {
      visszaJelzes = 'A(z) $kraterNev középpontja x=${kreater['x']}, y=${kreater['y']}, sugara ${kreater['r']}';
    }
  }
  print(visszaJelzes);
  print('4. feladat: ');
  if (kraterek.isEmpty) {
    print('4. feladat: Nincsenek adatok.');
  } else {
    Map<String, Object> legnagyobb = kraterek[0];
    for (var k in kraterek) {
      if ((k['r'] as double) > (legnagyobb['r'] as double)) {
        legnagyobb = k;
      }
    }
    print('4. feladat: A legnagyobb sugár: ${legnagyobb['r']}, neve: ${legnagyobb['nev']}');
  }
}
