import 'dart:io';

void main() {
    print("Adjon meg egy számot 1 és 100 között:");
    int szam = int.tryParse(stdin.readLineSync() ?? "") ?? 1;
    
    if (szam >= 1 && szam <= 100) {
        for (int i = 0; i < szam; i++) {
            print("Happy birthday!");
            print("Happy birthday to you!");
        }
    } else {
        print("Hibás bemenet!");
    }
}