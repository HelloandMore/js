void main() {
    // Tesztelés
    print(headTail("alma")); // "maal"
    print(headTail("ablak")); // "aklab"
    
    print(evenFizz(4)); // "Even"
    print(evenFizz(9)); // "Fizz"
    print(evenFizz(12)); // "EvenFizz"
    print(evenFizz(17)); // "17"
    
    print(likeFibo(0)); // []
    print(likeFibo(1)); // [0]
    print(likeFibo(2)); // [0, 1]
    print(likeFibo(3)); // [0, 1, 1]
    print(likeFibo(10)); // [0, 1, 1, 1, 2, 3, 4, 6, 9, 13]
    
    print(vowelLower("alma")); // "aLMa"
    print(vowelLower("ablak")); // "aBLaK"
}

String headTail(String txt) {
    int mid = (txt.length / 2).ceil();
    return txt.substring(mid) + txt.substring(0, mid);
}

String evenFizz(int number) {
    if (number % 2 == 0 && number % 3 == 0) {
        return "EvenFizz";
    } else if (number % 2 == 0) {
        return "Even";
    } else if (number % 3 == 0) {
        return "Fizz";
    } else {
        return number.toString();
    }
}

List<int> likeFibo(int number) {
    List<int> fibo = [];
    if (number <= 0) return fibo;
    if (number >= 1) fibo.add(0);
    if (number >= 2) fibo.add(1);
    if (number >= 3) fibo.add(1);
    
    for (int i = 3; i < number; i++) {
        fibo.add(fibo[i - 1] + fibo[i - 3]);
    }
    
    return fibo;
}

String vowelLower(String txt) {
    return txt.split('').map((char) {
        if ('aeiouAEIOU'.contains(char)) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    }).join('');
}