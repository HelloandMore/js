void main() {
    // 1. Hozd létre a fixList fix 10 elemű listát, melynek az értékei 0-k, majd minden páratlan indexű elemet cseréld 1-re!
    List<int> fixList = List.filled(10, 0);
    for (int i = 0; i < fixList.length; i++) {
        if (i % 2 == 1) {
            fixList[i] = 1;
        }
    }
    
    // 2. Hozd létre a list listát, melynek páros indexhelyein 1, a páratlan indexen 0 szerepel.
    List<int> list = [];
    for (int i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            list.add(1);
        } else {
            list.add(0);
        }
    }
    
    // 3. Hozd létre a fiboList listát és töltsd fel a 30-nál kisebb Fibonacci számokkal!
    List<int> fiboList = [];
    int a = 0, b = 1;
    while (a < 30) {
        fiboList.add(a);
        int temp = a + b;
        a = b;
        b = temp;
    }
    
    // 4. Írasd ki a fiboList adatait
    print('fiboList hossza: ${fiboList.length}');
    print('Első elem: ${fiboList.first}');
    print('Utolsó elem: ${fiboList.last}');
    print('3-as indexű elem: ${fiboList[3]}');
    print('8 indexe: ${fiboList.indexOf(8)}');
    print('Fordított sorrend: ${fiboList.reversed.toList()}');
    print('Nem üres-e: ${fiboList.isNotEmpty}');
    
    fiboList.clear();
    print('Üres-e törlés után: ${fiboList.isEmpty}');
    
    fiboList.add(34);
    fiboList.addAll([1, 2, 3, 5, 7]);
    print('34 és [1,2,3,5,7] hozzáadása után: $fiboList');
    
    int index34 = fiboList.indexOf(34);
    fiboList.insertAll(index34 + 1, [0, 1]);
    print('34 után [0,1] beszúrása: $fiboList');
    
    fiboList.replaceRange(fiboList.length - 1, fiboList.length, [8, 13, 21]);
    print('Utolsó elem cseréje [8,13,21]-re: $fiboList');
    
    fiboList.removeAt(0);
    print('Első elem törlése után: $fiboList');
    
    // 5. Hozd létre a fiboSquare listát a fiboListből, úgy, hogy az értékei a fiboList négyzetei legyenek!
    List<int> fiboSquare = fiboList.map((x) => x * x).toList();
    print('fiboSquare: $fiboSquare');
    
    // 6. Hozd létre az allFibo listát, mely a fiboList és fiboSquare páratlan elemeit tartalmazza csökkenő sorrendben!
    List<int> allFibo = [];
    allFibo.addAll(fiboList.where((x) => x % 2 == 1));
    allFibo.addAll(fiboSquare.where((x) => x % 2 == 1));
    allFibo.sort((a, b) => b.compareTo(a));
    print('allFibo (páratlan elemek csökkenő sorrendben): $allFibo');
}