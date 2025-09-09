void main() {
    // 1. Változók létrehozása és értékadás
    int intValue = 10;
    double doubleValue = 3.14;
    String strValue = "Hello, Dart!";
    bool boolValue = true;

    // 2. Műveletek számokkal
    int intResult = intValue + 5; // összeadás
    double doubleResult = doubleValue * 2; // szorzás

    // 3. Változók értékeinek kiíratása
    // intValue értéke
    print("intValue értéke: $intValue");
    // doubleValue értéke
    print("doubleValue értéke: $doubleValue");
    // strValue értéke
    print("strValue értéke: $strValue");
    // boolValue értéke
    print("boolValue értéke: $boolValue");

    // intResult eredménye
    print("intResult (intValue + 5): $intResult");
    // doubleResult eredménye
    print("doubleResult (doubleValue * 2): $doubleResult");

    // 4. boolResult értéke (boolValue negáltja)
    bool boolResult = !boolValue;
    print("boolResult (boolValue negáltja): $boolResult");

    // 5. Szorgalmi: további műveletek
    // Kivonás
    int intSub = intValue - 3;
    print("intValue - 3: $intSub");

    // Osztás
    double doubleDiv = doubleValue / 2;
    print("doubleValue / 2: $doubleDiv");

    // Maradékos osztás
    int intMod = intValue % 3;
    print("intValue % 3: $intMod");

    // String összefűzés
    String strConcat = strValue + " Ez egy szorgalmi példa.";
    print("strValue + szorgalmi szöveg: $strConcat");
}