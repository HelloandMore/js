import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  ThemeMode _themeMode = ThemeMode.system;

  void _onThemeChanged(ThemeMode mode) {
    setState(() {
      _themeMode = mode;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      themeMode: _themeMode,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      darkTheme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.dark,
        ),
        brightness: Brightness.dark,
      ),
      home: MyHomePage(
        title: 'Flutter Demo Home Page',
        currentThemeMode: _themeMode,
        onThemeChanged: _onThemeChanged,
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({
    super.key,
    required this.title,
    required this.currentThemeMode,
    required this.onThemeChanged,
  });

  final String title;
  final ThemeMode currentThemeMode;
  final ValueChanged<ThemeMode> onThemeChanged;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  String _themeModeLabel(ThemeMode mode) {
    switch (mode) {
      case ThemeMode.light:
        return 'Light';
      case ThemeMode.dark:
        return 'Dark';
      case ThemeMode.system:
        return 'System Default';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
        actions: [
          PopupMenuButton<ThemeMode>(
            icon: const Icon(Icons.palette),
            tooltip: 'Change Theme',
            initialValue: widget.currentThemeMode,
            onSelected: widget.onThemeChanged,
            itemBuilder: (BuildContext context) => [
              PopupMenuItem<ThemeMode>(
                value: ThemeMode.light,
                child: Row(
                  children: [
                    Icon(
                      Icons.light_mode,
                      color: widget.currentThemeMode == ThemeMode.light
                          ? Theme.of(context).colorScheme.primary
                          : null,
                    ),
                    const SizedBox(width: 12),
                    Text(
                      'Light',
                      style: TextStyle(
                        fontWeight: widget.currentThemeMode == ThemeMode.light
                            ? FontWeight.bold
                            : FontWeight.normal,
                        color: widget.currentThemeMode == ThemeMode.light
                            ? Theme.of(context).colorScheme.primary
                            : null,
                      ),
                    ),
                  ],
                ),
              ),
              PopupMenuItem<ThemeMode>(
                value: ThemeMode.dark,
                child: Row(
                  children: [
                    Icon(
                      Icons.dark_mode,
                      color: widget.currentThemeMode == ThemeMode.dark
                          ? Theme.of(context).colorScheme.primary
                          : null,
                    ),
                    const SizedBox(width: 12),
                    Text(
                      'Dark',
                      style: TextStyle(
                        fontWeight: widget.currentThemeMode == ThemeMode.dark
                            ? FontWeight.bold
                            : FontWeight.normal,
                        color: widget.currentThemeMode == ThemeMode.dark
                            ? Theme.of(context).colorScheme.primary
                            : null,
                      ),
                    ),
                  ],
                ),
              ),
              PopupMenuItem<ThemeMode>(
                value: ThemeMode.system,
                child: Row(
                  children: [
                    Icon(
                      Icons.settings_suggest,
                      color: widget.currentThemeMode == ThemeMode.system
                          ? Theme.of(context).colorScheme.primary
                          : null,
                    ),
                    const SizedBox(width: 12),
                    Text(
                      'System Default',
                      style: TextStyle(
                        fontWeight: widget.currentThemeMode == ThemeMode.system
                            ? FontWeight.bold
                            : FontWeight.normal,
                        color: widget.currentThemeMode == ThemeMode.system
                            ? Theme.of(context).colorScheme.primary
                            : null,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Current theme: ${_themeModeLabel(widget.currentThemeMode)}',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 24),
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
