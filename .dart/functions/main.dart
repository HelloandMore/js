import 'dart:io';
import 'dart:math';

// 1. Full Name Program
String fullName() {
    String name = getName();
    return name;
}

String getName() {
    stdout.write('Kérem, adja meg a vezetéknevét: ');
    String lastName = stdin.readLineSync()! ?? '';
    stdout.write('Kérem, adja meg a keresztnevét: ');
    String firstName = stdin.readLineSync()! ?? '';
    return '$lastName $firstName';
}

double terfogat(double a, double b, double c) {
    return a * b * c;
}

double felulet(double a, double b, double c) {
    return 2 * (abTerulete(a, b) + acTerulete(a, c) + bcTerulete(b, c));
}

double abTerulete(double a, double b) {
    return a * b;
}

double acTerulete(double a, double c) {
    return a * c;
}

double bcTerulete(double b, double c) {
    return b * c;
}

double kupTerfogat(double radius, double height) {
    return (1 / 3) * pi * pow(radius, 2) * height;
}

double kupFelszin(double radius, double height) {
    double slantHeight = sqrt(pow(radius, 2) + pow(height, 2));
    return pi * radius * (radius + slantHeight);
}

void main() {
    print('Teljes név: ${fullName()}');

    double a = 3.0, b = 4.0, c = 5.0;
    print('Térfogat: ${terfogat(a, b, c)}');
    print('Felszín: ${felulet(a, b, c)}');
    print('AB területe: ${abTerulete(a, b)}');
    print('AC területe: ${acTerulete(a, c)}');
    print('BC területe: ${bcTerulete(b, c)}');

    stdout.write('Kérem, adja meg a kúp alapjának sugarát: ');
    double radius = double.parse(stdin.readLineSync() ?? '0');
    stdout.write('Kérem, adja meg a kúp magasságát: ');
    double height = double.parse(stdin.readLineSync() ?? '0');
    print('Kúp térfogata: ${kupTerfogat(radius, height)}');
    print('Kúp felszíne: ${kupFelszin(radius, height)}');
}