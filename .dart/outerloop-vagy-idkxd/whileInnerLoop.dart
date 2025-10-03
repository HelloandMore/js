import 'dart:io';

void main() {
    print("Adjon meg egy számot 3 és 9 között:");
    int? szam = int.tryParse(stdin.readLineSync() ?? '');
    
    if (szam != null && szam >= 3 && szam <= 9) {
        int kulso = 0;
        while (kulso <= 10) {
            if (kulso == szam) {
                break;
            }
            
            int belso = 0;
            while (belso <= 10) {
                if (belso == szam) {
                    break;
                }
                print("Külső: $kulso, Belső: $belso");
                belso++;
            }
            kulso++;
        }
    } else {
        print("Hibás bemenet!");
    }
}