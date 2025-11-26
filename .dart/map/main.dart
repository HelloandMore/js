void main() {
    // 1. Hozd létre a weekMap-et
    Map<String, List<String>> weekMap = {
        'Monday': ['workday', 'remote workday', 'national holiday'],
        'Tuesday': ['workday'],
        'Wednesday': ['workday'],
        'Thursday': ['workday', 'remote workday'],
        'Friday': ['workday'],
        'Sunday': ['rest']
    };

    // 2. Írasd ki a weekMap kulcsait listában
    print('Keys: ${weekMap.keys.toList()}');

    // Írasd ki az értékeket listában - soronként egy-egy lista és írd ki a listák hosszát is
    print('Values:');
    for (var valueList in weekMap.values) {
        print('- $valueList (length: ${valueList.length})');
    }

    // 3. Módosítsd a weekMapet
    weekMap['Wednesday'] = ['workday', 'remote workday', 'national holiday'];
    weekMap['Saturday'] = [];

    // 4. Távolítsd el azon elempárokat, melyneknél a value egy üres lista
    weekMap.removeWhere((key, value) => value.isEmpty);

    // 5. Írasd ki a key, value értékeket
    print('Entries after modifications:');
    weekMap.forEach((key, value) => print('$key: $value'));
}