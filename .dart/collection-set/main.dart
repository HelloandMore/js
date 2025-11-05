void main() {
    // 1. Hozd létre a week settet és írasd ki
    Set<String> week = {'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'};

    // a week tartalmát
    print('Week: $week');

    // az első elemet
    print('Első elem: ${week.first}');

    // az utolsó elemet
    print('Utolsó elem: ${week.last}');

    // üres-e
    print('Üres-e: ${week.isEmpty}');

    // nem üres-e
    print('Nem üres-e: ${week.isNotEmpty}');

    // a week hosszát
    print('Hossz: ${week.length}');

    // tartalmazza-e a szerda értéket
    print('Tartalmazza-e a "Wednesday": ${week.contains('Wednesday')}');

    // tartalmazza-e a Wednesday értéket
    print('Tartalmazza-e a "Wednesday": ${week.contains('Wednesday')}');

    // 2. A week-hez add hozzá az alábbi listát
    List<String> additionalDays = [
        "workday", "weekend", "holiday", "public holiday", "bank holiday",
        "national holiday", "religious holiday", "federal holiday", 
        "school holiday", "company holiday", "floating holiday", 
        "seasonal holiday", "observed holiday", "half-day", 
        "flexible day", "personal day", "sick day", 
        "leave of absence", "vacation day", "remote workday"
    ];

    week.addAll(additionalDays);

    // 3. Írasd ki egyesével a week elemeit!
    week.forEach((day) {
        print(day);
    });

    // 4. Hozd létre a schoolDays settet
    Set<String> schoolDays = {'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'};

    // 5. Írasd ki a week és a schoolDays hosszát
    print('Week hossza: ${week.length}');
    print('SchoolDays hossza: ${schoolDays.length}');

    // schoolDays és week különbségét
    Set<String> difference = week.difference(schoolDays);
    print('Különbség: $difference');

    // mindkettő esetén a 2, 3, 7, 11, 13 indexű elemeket (a felmerülő hibát kezeld)
    List<String> weekList = week.toList();
    List<String> schoolDaysList = schoolDays.toList();

    try {
        print('Week 2. index: ${weekList[2]}');
    } catch (e) {
        print('Week 2. index hiba: $e');
    }

    try {
        print('Week 3. index: ${weekList[3]}');
    } catch (e) {
        print('Week 3. index hiba: $e');
    }

    try {
        print('Week 7. index: ${weekList[7]}');
    } catch (e) {
        print('Week 7. index hiba: $e');
    }

    try {
        print('Week 11. index: ${weekList[11]}');
    } catch (e) {
        print('Week 11. index hiba: $e');
    }

    try {
        print('Week 13. index: ${weekList[13]}');
    } catch (e) {
        print('Week 13. index hiba: $e');
    }

    try {
        print('SchoolDays 2. index: ${schoolDaysList[2]}');
    } catch (e) {
        print('SchoolDays 2. index hiba: $e');
    }

    try {
        print('SchoolDays 3. index: ${schoolDaysList[3]}');
    } catch (e) {
        print('SchoolDays 3. index hiba: $e');
    }

    try {
        print('SchoolDays 7. index: ${schoolDaysList[7]}');
    } catch (e) {
        print('SchoolDays 7. index hiba: $e');
    }

    try {
        print('SchoolDays 11. index: ${schoolDaysList[11]}');
    } catch (e) {
        print('SchoolDays 11. index hiba: $e');
    }

    try {
        print('SchoolDays 13. index: ${schoolDaysList[13]}');
    } catch (e) {
        print('SchoolDays 13. index hiba: $e');
    }
}