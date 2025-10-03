import 'dart:io';
import 'dart:math';

void main() {
    // 1. Kérj be egy egész számot a felhasználótól!
    stdout.write('Adj meg egy egész számot: ');
    int? szam = int.tryParse(stdin.readLineSync() ?? '');

    if (szam == null) {
        print('Érvénytelen szám!');
        return;
    }

    // Páros vagy páratlan
    if (szam % 2 == 0) {
        print('A szám páros.');
    } else {
        print('A szám páratlan.');
    }

    // If használatával osztályzat
    if (szam == 1) {
        print('Elégtelen');
    } else if (szam == 2) {
        print('Elégséges');
    } else if (szam == 3) {
        print('Közepes');
    } else if (szam == 4) {
        print('Jó');
    } else if (szam == 5) {
        print('Jeles');
    } else {
        print('Érvénytelen osztályzat');
    }

    // Switch használatával osztályzat
    switch (szam) {
        case 1:
            print('Elégtelen (switch)');
            break;
        case 2:
            print('Elégséges (switch)');
            break;
        case 3:
            print('Közepes (switch)');
            break;
        case 4:
            print('Jó (switch)');
            break;
        case 5:
            print('Jeles (switch)');
            break;
        default:
            print('Érvénytelen osztályzat (switch)');
    }

    // Assert használatával ellenőrzés
    assert(szam >= 1 && szam <= 5, 'A szám nem megfelelő osztályzat!');

    // 2. Kérj be két számot és írd ki a nagyobbat, valamint az eltérést!
    stdout.write('\nAdj meg egy számot: ');
    int? a = int.tryParse(stdin.readLineSync() ?? '');
    stdout.write('Adj meg még egy számot: ');
    int? b = int.tryParse(stdin.readLineSync() ?? '');

    if (a == null || b == null) {
        print('Érvénytelen szám(ok)!');
        return;
    }

    int nagyobb = a > b ? a : b;
    int kulonbseg = (a - b).abs();

    print('A nagyobb szám: $nagyobb');
    print('A két szám közötti eltérés: $kulonbseg');

    // 3. Kérj be egy egész számot és írd ki a tulajdonságait!
    stdout.write('\nAdj meg egy egész számot: ');
    int? szam2 = int.tryParse(stdin.readLineSync() ?? '');

    if (szam2 == null) {
        print('Érvénytelen szám!');
        return;
    }

    // Páros vagy páratlan
    print(szam2 % 2 == 0 ? 'Páros' : 'Páratlan');

    // Pozitív, nulla, vagy negatív
    if (szam2 > 0) {
        print('Pozitív szám');
    } else if (szam2 == 0) {
        print('Nulla');
    } else {
        print('Negatív szám');
    }

    // Négyzetszám-e
    int gyok = sqrt(szam2.abs()).toInt();
    if (szam2 >= 0 && gyok * gyok == szam2) {
        print('Négyzetszám');
    } else {
        print('Nem négyzetszám');
    }

    // 4. Teszt pontszám és értékelés
    stdout.write('\nAdd meg a teszt összpontszámát: ');
    int? osszpont = int.tryParse(stdin.readLineSync() ?? '');
    stdout.write('Add meg az elért pontot: ');
    int? elert = int.tryParse(stdin.readLineSync() ?? '');

    if (osszpont == null || elert == null || osszpont <= 0 || elert < 0) {
        print('Érvénytelen pontszám(ok)!');
        return;
    }

    double szazalek = (elert / osszpont) * 100;
    String ertekeles;

    if (szazalek >= 90 && szazalek < 100) {
        ertekeles = 'A';
    } else if (szazalek >= 80 && szazalek < 90) {
        ertekeles = 'B';
    } else if (szazalek >= 70 && szazalek < 80) {
        ertekeles = 'C';
    } else if (szazalek >= 60 && szazalek < 70) {
        ertekeles = 'D';
    } else if (szazalek >= 50 && szazalek < 60) {
        ertekeles = 'E';
    } else if (szazalek >= 0 && szazalek < 50) {
        ertekeles = 'F';
    } else if (szazalek == 100) {
        ertekeles = 'A';
    } else {
        ertekeles = 'Érvénytelen százalék!';
    }

    print('Elért százalék: ${szazalek.toStringAsFixed(2)}%');
    print('Értékelés: $ertekeles');
}