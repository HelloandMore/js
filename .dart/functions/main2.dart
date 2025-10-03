String reverseString(String text) {
    return text.split('').reversed.join('');
}

int reverseInteger(int integer) {
    return int.parse(reverseString(integer.toString()));
}

double reverseNumber(num number) {
    return double.parse(reverseString(number.toString()));
}

int sortNumbersAsc(int integer) {
    var digits = integer.toString().split('');
    digits.sort();
    return int.parse(digits.join());
}

int sortNumbersDes(int number) {
    var digits = number.toString().split('');
    digits.sort((a, b) => b.compareTo(a));
    return int.parse(digits.join());
}

String fizzBuzz(int integer) {
    if (integer % 3 == 0 && integer % 5 == 0) {
        return 'FizzBuzz';
    } else if (integer % 3 == 0) {
        return 'Fizz';
    } else if (integer % 5 == 0) {
        return 'Buzz';
    } else {
        return integer.toString();
    }
}

bool isTriangleBySides(double a, double b, double c) {
    return a + b > c && a + c > b && b + c > a;
}

bool isTriangleByAngles(double a, double b, double c) {
    return a + b + c == 180;
}

String triangleTypeByAngles(double a, double b, double c) {
    if (!isTriangleByAngles(a, b, c)) return 'érvénytelen háromszög';
    if (a == 90 || b == 90 || c == 90) return 'derékszögű háromszög';
    if (a > 90 || b > 90 || c > 90) return 'tompaszögű háromszög';
    if (a == b && b == c) return 'egyenlő oldalú háromszög';
    if (a == b || b == c || a == c) return 'egyenlő szárú háromszög';
    return 'általános háromszög';
}

int padovanNumber(int n) {
    if (n == 0) return 0;
    if (n == 1 || n == 2) return 1;
    return padovanNumber(n - 2) + padovanNumber(n - 3);
}

void main() {
    print(reverseString("hello")); // Output: "olleh"
    print(reverseInteger(12345)); // Output: 54321
    print(reverseNumber(123.45)); // Output: 54.321
    print(sortNumbersAsc(321)); // Output: 123
    print(sortNumbersDes(321)); // Output: 321
    print(fizzBuzz(15)); // Output: "FizzBuzz"
    print(isTriangleBySides(3, 4, 5)); // Output: true
    print(isTriangleByAngles(60, 60, 60)); // Output: true
    print(triangleTypeByAngles(90, 45, 45)); // Output: "derékszögű háromszög"
    print(padovanNumber(5)); // Output: 3
}