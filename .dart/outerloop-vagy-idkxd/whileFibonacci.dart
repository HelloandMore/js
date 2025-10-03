import 'dart:io';

void main() {
    int a = 0;
    int b = 1;
    
    print(a);
    print(b);
    
    while (true) {
        int kovetkezo = a + b;
        if (kovetkezo > 100) {
            break;
        }
        print(kovetkezo);
        a = b;
        b = kovetkezo;
    }
}