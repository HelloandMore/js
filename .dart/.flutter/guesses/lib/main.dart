import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // TRY THIS: Try running your application with "flutter run". You'll see
        // the application has a purple toolbar. Then, without quitting the app,
        // try changing the seedColor in the colorScheme below to Colors.green
        // and then invoke "hot reload" (save your changes or press the "hot
        // reload" button in a Flutter-supported IDE, or press "r" if you used
        // the command line to start the app).
        //
        // Notice that the counter didn't reset back to zero; the application
        // state is not lost during the reload. To reset the state, use hot
        // restart instead.
        //
        // This works for code too, not just values: Most code changes can be
        // tested with just a hot reload.
        colorScheme: .fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final TextEditingController _controller = TextEditingController();
  int _targetNumber = 0;
  int _attempts = 0;
  String _feedback = '';

  @override
  void initState() {
    super.initState();
    _resetGame();
  }

  void _resetGame() {
    _targetNumber = 1 + (DateTime.now().millisecondsSinceEpoch % 100);
    _attempts = 0;
    _feedback = '';
    _controller.clear();
    setState(() {});
  }

  void _checkGuess() {
    final guess = int.tryParse(_controller.text);
    if (guess == null) {
      setState(() {
        _feedback = 'Please enter a valid number.';
      });
      return;
    }
    _attempts++;
    if (guess < _targetNumber) {
      setState(() {
        _feedback = 'Try greater!';
      });
    } else if (guess > _targetNumber) {
      setState(() {
        _feedback = 'Try less!';
      });
    } else {
      setState(() {
        _feedback = 'Correct! You guessed in $_attempts attempts.';
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('Guess the number between 1 and 100'),
            TextField(
              controller: _controller,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: 'Enter your guess'),
              onSubmitted: (_) => _checkGuess(),
            ),
            SizedBox(height: 16),
            ElevatedButton(onPressed: _checkGuess, child: Text('Guess')),
            SizedBox(height: 16),
            Text(_feedback, style: TextStyle(fontSize: 18)),
            SizedBox(height: 16),
            Text('Attempts: $_attempts'),
            SizedBox(height: 16),
            ElevatedButton(onPressed: _resetGame, child: Text('Restart')),
          ],
        ),
      ),
    );
  }
}
