import 'dart:io';

int age = 25;
double height = 5.9;
bool isStudent = true;
List<String> hobbies = ["Reading", "Traveling", "Coding"];
Map<String, int> scores = {"Math": 90, "Science": 85, "English": 88};
String intvalue = "100";
int convertedValue = int.parse(intvalue);
String floatvalue = "3.1418";
double convertedFloatValue = double.parse(floatvalue);
String tripleQuotedString = '''This is a
triple-quoted string
that spans multiple lines.
It preserves line breaks and spaces.''';

void main() {
    print("Enter your name: ");
    String? name = stdin.readLineSync();
    print("Name: $name");
    print("Age: $age");
    print("Height: $height");
    print("Is Student: ${isStudent ? 'Yes' : 'No'}");
    print("Hobbies: $hobbies");
    print("Scores: $scores");
    print("Converted Value from String: $convertedValue");
    print("Converted Float Value from String: ${convertedFloatValue.toStringAsFixed(2)}");
    print("Triple Quoted String:\n$tripleQuotedString");
}