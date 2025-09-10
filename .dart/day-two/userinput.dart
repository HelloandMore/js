void main() {
    // 1. Falvédő vers (példa: "Aki keres, talál.")
    String falvedo = "Aki keres, talál.";

    // 2. Kiíratások
    print(falvedo); // eredetiben
    print(falvedo.toLowerCase()); // kisbetűvel
    print(falvedo.toUpperCase()); // nagybetűvel
    print(falvedo.trim()); // trimmelve
    print(falvedo.replaceAll(' ', '-')); // szóközöket kötőjellel

    // 5. karaktertől a végéig, elején "... "
    print('... ${falvedo.substring(4)}');

    // Első 3 karakter UTF-16 kódja
    for (int i = 0; i < 3 && i < falvedo.length; i++) {
        print('UTF-16 kód (${falvedo[i]}): ${falvedo.codeUnitAt(i)}');
    }

    // 10. karaktertől a végéig, végén " ..."
    if (falvedo.length >= 10) {
        print('${falvedo.substring(9)} ...');
    } else {
        print('A szöveg rövidebb, mint 10 karakter.');
    }
}