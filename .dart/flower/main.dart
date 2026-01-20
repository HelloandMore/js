import 'dart:io';

class Felajanlas {
  int kezdo;
  int veg;
  String szin;

  Felajanlas(this.kezdo, this.veg, this.szin);

  // Ellenőrzi, hogy egy adott ágyás benne van-e a felajánlásban
  bool tartalmazza(int agyasSorszam, int osszesAgyasok) {
    if (kezdo <= veg) {
      // Normál intervallum
      return agyasSorszam >= kezdo && agyasSorszam <= veg;
    } else {
      // Átfordul a bejáraton (pl. 95-5: 95-100 és 1-5)
      return agyasSorszam >= kezdo || agyasSorszam <= veg;
    }
  }

  // Ellenőrzi, hogy a bejárat mindkét oldala benne van-e
  bool bejarat(int osszesAgyasok) {
    return tartalmazza(1, osszesAgyasok) && tartalmazza(osszesAgyasok, osszesAgyasok);
  }
}

void main() {
  // 1. feladat - Beolvasás
  List<String> sorok = File('felajanlas.txt').readAsLinesSync();
  int agyasokSzama = int.parse(sorok[0]);
  List<Felajanlas> felajanlasok = [];

  for (int i = 1; i < sorok.length; i++) {
    List<String> reszek = sorok[i].split(' ');
    int kezdo = int.parse(reszek[0]);
    int veg = int.parse(reszek[1]);
    String szin = reszek[2];
    felajanlasok.add(Felajanlas(kezdo, veg, szin));
  }

  // 2. feladat
  print('2. feladat');
  print('A felajanlasok szama: ${felajanlasok.length}');

  // 3. feladat
  print('\n3. feladat');
  print('A bejarat mindket oldalán ultetok: ', );
  List<int> bejaratosak = [];
  for (int i = 0; i < felajanlasok.length; i++) {
    if (felajanlasok[i].bejarat(agyasokSzama)) {
      bejaratosak.add(i + 1);
    }
  }
  print(bejaratosak.join(' '));

  // 4. feladat
  print('\n4. feladat');
  stdout.write('Adja meg az agyas sorszamat! ');
  int bekertSorszam = int.parse(stdin.readLineSync()!);

  // 4a - Hány felajánlásban szerepel
  int szereplesekSzama = 0;
  for (var felajanlas in felajanlasok) {
    if (felajanlas.tartalmazza(bekertSorszam, agyasokSzama)) {
      szereplesekSzama++;
    }
  }
  print('A felajanlok szama: $szereplesekSzama');

  // 4b - Milyen színű lesz (csak az első ültet)
  String? elsoSzin;
  for (var felajanlas in felajanlasok) {
    if (felajanlas.tartalmazza(bekertSorszam, agyasokSzama)) {
      elsoSzin = felajanlas.szin;
      break;
    }
  }
  if (elsoSzin != null) {
    print('A viragagyas szine, ha csak az elso ultet: $elsoSzin');
  } else {
    print('Ezt az agyast nem ultetik be.');
  }

  // 4c - Milyen színekben pompázna (mindenki ültet)
  Set<String> osszesszin = {};
  for (var felajanlas in felajanlasok) {
    if (felajanlas.tartalmazza(bekertSorszam, agyasokSzama)) {
      osszesszin.add(felajanlas.szin);
    }
  }
  if (osszesszin.isNotEmpty) {
    print('A viragagyas szinei: ${osszesszin.join(' ')}');
  }

  // 5. feladat
  print('\n5. feladat');
  
  // Megszámoljuk a beültetve ágyásokat
  List<bool> beultetve = List.filled(agyasokSzama + 1, false);
  for (int i = 0; i < felajanlasok.length; i++) {
    var felajanlas = felajanlasok[i];
    if (felajanlas.kezdo <= felajanlas.veg) {
      for (int j = felajanlas.kezdo; j <= felajanlas.veg; j++) {
        beultetve[j] = true;
      }
    } else {
      for (int j = felajanlas.kezdo; j <= agyasokSzama; j++) {
        beultetve[j] = true;
      }
      for (int j = 1; j <= felajanlas.veg; j++) {
        beultetve[j] = true;
      }
    }
  }
  
  int beultetettAgyasok = 0;
  for (int i = 1; i <= agyasokSzama; i++) {
    if (beultetve[i]) beultetettAgyasok++;
  }

  // Összesítjük a vállalt ágyások számát
  int vallaltAgyasok = 0;
  for (var felajanlas in felajanlasok) {
    if (felajanlas.kezdo <= felajanlas.veg) {
      vallaltAgyasok += felajanlas.veg - felajanlas.kezdo + 1;
    } else {
      vallaltAgyasok += (agyasokSzama - felajanlas.kezdo + 1) + felajanlas.veg;
    }
  }

  if (beultetettAgyasok == agyasokSzama) {
    print('Minden agyas beultetesere van jelentkezo.');
  } else if (vallaltAgyasok >= agyasokSzama) {
    print('Atszervezessel megoldhato a beultetes.');
  } else {
    print('A beultetes nem oldhato meg.');
  }

  // 6. feladat - szinek.txt létrehozása
  List<String> agyasSzinek = List.filled(agyasokSzama + 1, '#');
  List<int> agyasFelajanlasok = List.filled(agyasokSzama + 1, 0);

  for (int i = 0; i < felajanlasok.length; i++) {
    var felajanlas = felajanlasok[i];
    if (felajanlas.kezdo <= felajanlas.veg) {
      // Normál intervallum
      for (int j = felajanlas.kezdo; j <= felajanlas.veg; j++) {
        if (agyasSzinek[j] == '#') {
          agyasSzinek[j] = felajanlas.szin;
          agyasFelajanlasok[j] = i + 1;
        }
      }
    } else {
      // Átforduló intervallum
      for (int j = felajanlas.kezdo; j <= agyasokSzama; j++) {
        if (agyasSzinek[j] == '#') {
          agyasSzinek[j] = felajanlas.szin;
          agyasFelajanlasok[j] = i + 1;
        }
      }
      for (int j = 1; j <= felajanlas.veg; j++) {
        if (agyasSzinek[j] == '#') {
          agyasSzinek[j] = felajanlas.szin;
          agyasFelajanlasok[j] = i + 1;
        }
      }
    }
  }

  // Kiírás fájlba
  var kimenet = File('szinek.txt').openWrite();
  for (int i = 1; i <= agyasokSzama; i++) {
    kimenet.writeln('${agyasSzinek[i]} ${agyasFelajanlasok[i]}');
  }
  kimenet.close();
}
