import 'dart:io';
import 'epitmeny.dart';

late int aSav;
late int bSav;
late int cSav;

void main() {
  List<Epitmeny> epitmenyek = beolvas();
  
  fizetendoAdo(epitmenyek);
}

List<Epitmeny> beolvas() {
  List<Epitmeny> epitmenyek = [];
  
  try {
    List<String> sorok = File('utca.txt').readAsLinesSync();
    
    List<String> adosavok = sorok[0].split(' ');
    aSav = int.parse(adosavok[0]);
    bSav = int.parse(adosavok[1]);
    cSav = int.parse(adosavok[2]);
    
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

void fizetendoAdo(List<Epitmeny> epitmenyek) {
  Map<int, int> tulajdonosok = {};
  
  for (var epitmeny in epitmenyek) {
    int fizetendo = ado(epitmeny.adosav, epitmeny.alapterulet);
    
    if (tulajdonosok.containsKey(epitmeny.adoszam)) {
      tulajdonosok[epitmeny.adoszam] = tulajdonosok[epitmeny.adoszam]! + fizetendo;
    } else {
      tulajdonosok[epitmeny.adoszam] = fizetendo;
    }
  }
  
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
