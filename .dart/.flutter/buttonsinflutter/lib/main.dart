import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Button Widgets Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Button Widgets Demo'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const MaterialButtonWidget(),
            const SizedBox(height: 30),
            const ElevatedButtonWidget(),
            const SizedBox(height: 30),
            const FloatingActionButtonWidget(),
            const SizedBox(height: 30),
            const IconButtonWidget(),
            const SizedBox(height: 30),
            const OutlinedButtonWidget(),
            const SizedBox(height: 30),
            const TextButtonWidget(),
          ],
        ),
      ),
    );
  }
}

class MaterialButtonWidget extends StatefulWidget {
  const MaterialButtonWidget({super.key});

  @override
  State<MaterialButtonWidget> createState() => _MaterialButtonWidgetState();
}

class _MaterialButtonWidgetState extends State<MaterialButtonWidget> {
  bool _showText = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            _showText ? 'MaterialButton szöveg' : '',
            style: const TextStyle(fontSize: 18),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              MaterialButton(
                onPressed: () {
                  setState(() {
                    _showText = true;
                  });
                },
                color: Colors.blue,
                textColor: Colors.white,
                child: const Text('Megjelenít'),
              ),
              const SizedBox(width: 20),
              MaterialButton(
                onPressed: () {
                  setState(() {
                    _showText = false;
                  });
                },
                color: Colors.red,
                textColor: Colors.white,
                child: const Text('Elrejt'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class ElevatedButtonWidget extends StatefulWidget {
  const ElevatedButtonWidget({super.key});

  @override
  State<ElevatedButtonWidget> createState() => _ElevatedButtonWidgetState();
}

class _ElevatedButtonWidgetState extends State<ElevatedButtonWidget> {
  bool _showText = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            _showText ? 'ElevatedButton szöveg' : '',
            style: const TextStyle(fontSize: 18),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    _showText = true;
                  });
                },
                child: const Text('Megjelenít'),
              ),
              const SizedBox(width: 20),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    _showText = false;
                  });
                },
                child: const Text('Elrejt'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class FloatingActionButtonWidget extends StatefulWidget {
  const FloatingActionButtonWidget({super.key});

  @override
  State<FloatingActionButtonWidget> createState() =>
      _FloatingActionButtonWidgetState();
}

class _FloatingActionButtonWidgetState
    extends State<FloatingActionButtonWidget> {
  bool _showText = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            _showText ? 'FloatingActionButton szöveg' : '',
            style: const TextStyle(fontSize: 18),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              FloatingActionButton(
                onPressed: () {
                  setState(() {
                    _showText = true;
                  });
                },
                heroTag: 'fab1',
                child: const Icon(Icons.visibility),
              ),
              const SizedBox(width: 20),
              FloatingActionButton(
                onPressed: () {
                  setState(() {
                    _showText = false;
                  });
                },
                heroTag: 'fab2',
                child: const Icon(Icons.visibility_off),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class IconButtonWidget extends StatefulWidget {
  const IconButtonWidget({super.key});

  @override
  State<IconButtonWidget> createState() => _IconButtonWidgetState();
}

class _IconButtonWidgetState extends State<IconButtonWidget> {
  bool _showText = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            _showText ? 'IconButton szöveg' : '',
            style: const TextStyle(fontSize: 18),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                onPressed: () {
                  setState(() {
                    _showText = true;
                  });
                },
                icon: const Icon(Icons.add_circle),
                iconSize: 40,
                color: Colors.green,
              ),
              const SizedBox(width: 20),
              IconButton(
                onPressed: () {
                  setState(() {
                    _showText = false;
                  });
                },
                icon: const Icon(Icons.remove_circle),
                iconSize: 40,
                color: Colors.red,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class OutlinedButtonWidget extends StatefulWidget {
  const OutlinedButtonWidget({super.key});

  @override
  State<OutlinedButtonWidget> createState() => _OutlinedButtonWidgetState();
}

class _OutlinedButtonWidgetState extends State<OutlinedButtonWidget> {
  bool _showText = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            _showText ? 'OutlinedButton szöveg' : '',
            style: const TextStyle(fontSize: 18),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              OutlinedButton(
                onPressed: () {
                  setState(() {
                    _showText = true;
                  });
                },
                child: const Text('Megjelenít'),
              ),
              const SizedBox(width: 20),
              OutlinedButton(
                onPressed: () {
                  setState(() {
                    _showText = false;
                  });
                },
                child: const Text('Elrejt'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class TextButtonWidget extends StatefulWidget {
  const TextButtonWidget({super.key});

  @override
  State<TextButtonWidget> createState() => _TextButtonWidgetState();
}

class _TextButtonWidgetState extends State<TextButtonWidget> {
  bool _showText = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            _showText ? 'TextButton szöveg' : '',
            style: const TextStyle(fontSize: 18),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextButton(
                onPressed: () {
                  setState(() {
                    _showText = true;
                  });
                },
                child: const Text('Megjelenít'),
              ),
              const SizedBox(width: 20),
              TextButton(
                onPressed: () {
                  setState(() {
                    _showText = false;
                  });
                },
                child: const Text('Elrejt'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
