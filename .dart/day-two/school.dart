void main() {
    // 1. Írd ki az iskola nevét!
    String schoolName = 'szegedi szc vasvári pál gazdasági és informatikai technikum';
    print('Iskola neve: $schoolName');

    // 2. Változók az iskola címéhez
    String iranyitoszam = '1234';
    String utca = 'Fő utca';
    String telepules = 'Mintaváros';
    String hazszam = '12';

    print('Iskola neve: $schoolName');
    print('Cím: $iranyitoszam $telepules, $utca $hazszam');

    // 3. Évfolyamok létszáma
    int osztalyLetszam = 28;
    int kilencedikOsztalyok = 4;
    int tobbiEvfolyamOsztalyok = 3;
    int evfolyamokSzama = 4; // 9-12. évfolyam

    int kilencedikEvfolyamLetszam = kilencedikOsztalyok * osztalyLetszam;
    int tobbiEvfolyamLetszam = tobbiEvfolyamOsztalyok * osztalyLetszam;

    print('9. évfolyam létszáma: $kilencedikEvfolyamLetszam fő');
    for (int evfolyam = 10; evfolyam <= 12; evfolyam++) {
        print('$evfolyam. évfolyam létszáma: $tobbiEvfolyamLetszam fő');
    }
}