import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Counter App',
      debugShowCheckedModeBanner: true,
      theme: ThemeData(useMaterial3: true),
      home: const CounterPage(),
    );
  }
}

class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int _counter = 100;

  void _updateCounter(int value) {
    setState(() {
      _counter += value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(250, 243, 225, 1),
      appBar: AppBar(
        backgroundColor: const Color.fromRGBO(250, 129, 18, 1),
        title: const Text(
          'Counter App',
          style: TextStyle(
            color: Color.fromRGBO(34, 34, 34, 1),
            fontSize: 20,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Current counter value',
              style: TextStyle(
                fontSize: 20,
                color: Color.fromRGBO(34, 34, 34, 1),
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 30),
            Text(
              '$_counter',
              style: const TextStyle(
                fontSize: 40,
                color: Color.fromRGBO(34, 34, 34, 1),
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 80),
            // Top row - ElevatedButton gombok
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: 60,
                  height: 60,
                  child: ElevatedButton(
                    onPressed: () => _updateCounter(-1),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromRGBO(250, 129, 18, 1),
                      foregroundColor: const Color.fromRGBO(34, 34, 34, 1),
                      shape: const CircleBorder(),
                      padding: EdgeInsets.zero,
                    ),
                    child: const Text(
                      '-1',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 20),
                SizedBox(
                  width: 60,
                  height: 60,
                  child: ElevatedButton(
                    onPressed: () => _updateCounter(1),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromRGBO(250, 129, 18, 1),
                      foregroundColor: const Color.fromRGBO(34, 34, 34, 1),
                      shape: const CircleBorder(),
                      padding: EdgeInsets.zero,
                    ),
                    child: const Text(
                      '+1',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 30),
            // Bottom row - MaterialButton gombok
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: 120,
                  height: 50,
                  child: MaterialButton(
                    onPressed: () => _updateCounter(-10),
                    color: const Color.fromRGBO(250, 243, 225, 1),
                    textColor: const Color.fromRGBO(34, 34, 34, 1),
                    elevation: 4,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      '-10',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 20),
                SizedBox(
                  width: 120,
                  height: 50,
                  child: MaterialButton(
                    onPressed: () => _updateCounter(10),
                    color: const Color.fromRGBO(250, 243, 225, 1),
                    textColor: const Color.fromRGBO(34, 34, 34, 1),
                    elevation: 4,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      '+10',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
