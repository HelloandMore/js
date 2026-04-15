// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter_test/flutter_test.dart';

import 'package:num_guessing/main.dart';

void main() {
  testWidgets('shows the guessing screen', (WidgetTester tester) async {
    await tester.pumpWidget(const GuessingApp());

    expect(find.text('Number Guessing Game'), findsOneWidget);
    expect(find.text('Guess a number between 1 and 100.'), findsOneWidget);
  });
}
