import 'dart:io';
import 'epitmeny.dart';

// Globális változók az adósávokhoz
late int aSav;
late int bSav;
late int cSav;

void main() {
  // 1. Adatok beolvasása
  List<Epitmeny> epitmenyek = beolvas();
  
  // 7. Fizetendő adó tulajdonosonként
  fizetendoAdo(epitmenyek);
}

// 1. Beolvasás függvény
List<Epitmeny> beolvas() {
  List<Epitmeny> epitmenyek = [];
  
  try {
    List<String> sorok = File('utca.txt').readAsLinesSync();
    
    // Első sor: adósávok
    List<String> adosavok = sorok[0].split(' ');
    aSav = int.parse(adosavok[0]);
    bSav = int.parse(adosavok[1]);
    cSav = int.parse(adosavok[2]);
    
    // Többi sor: épitmények
    for (int i = 1; i < sorok.length; i++) {
      List<String> adatok = sorok[i].split(' ');
      
      int adoszam = int.parse(adatok[0]);
      String utca = adatok[1];
      String hazszam = adatok[2];
      String adosav = adatok[3];
      int alapterulet = int.parse(adatok[4]);
      
      epitmenyek.add(Epitmeny(adoszam, utca, hazszam, adosav, alapterulet));
    }
  } catch (e) {
    print('Hiba a fájl beolvasása során: $e');
  }
  
  return epitmenyek;
}

// 4. Adó kiszámítása függvény
int ado(String adosav, int alapterulet) {
  int egysegar;
  
  switch (adosav) {
    case 'A':
      egysegar = aSav;
      break;
    case 'B':
      egysegar = bSav;
      break;
    case 'C':
      egysegar = cSav;
      break;
    default:
      egysegar = 0;
  }
  
  return egysegar * alapterulet;
}

// 7. Fizetendő adó tulajdonosonként
void fizetendoAdo(List<Epitmeny> epitmenyek) {
  // Adószám szerint csoportosítás és összegzés
  Map<int, int> tulajdonosok = {};
  
  for (var epitmeny in epitmenyek) {
    int fizetendo = ado(epitmeny.adosav, epitmeny.alapterulet);
    
    if (tulajdonosok.containsKey(epitmeny.adoszam)) {
      tulajdonosok[epitmeny.adoszam] = tulajdonosok[epitmeny.adoszam]! + fizetendo;
    } else {
      tulajdonosok[epitmeny.adoszam] = fizetendo;
    }
  }
  
  // Kiírás fájlba
  try {
    var fajl = File('fizetendo.txt');
    var sink = fajl.openWrite();
    
    tulajdonosok.forEach((adoszam, osszeg) {
      sink.writeln('$adoszam $osszeg');
    });
    
    sink.close();
    print('A fizetendo.txt fájl sikeresen létrehozva.');
  } catch (e) {
    print('Hiba a fájl írása során: $e');
  }
}
