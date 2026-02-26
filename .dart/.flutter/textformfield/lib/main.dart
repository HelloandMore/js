import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Űrlap',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(colorSchemeSeed: Colors.indigo, useMaterial3: true),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _ageConfirmController = TextEditingController();
  bool _isAdult = false;
  String? _submittedName;

  @override
  void dispose() {
    _nameController.dispose();
    _ageConfirmController.dispose();
    super.dispose();
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      if (!_isAdult) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Tartalom nem érhető el'),
            backgroundColor: Colors.red,
          ),
        );
        return;
      }
      setState(() => _submittedName = _nameController.text.trim());
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Üdvözöljük, ${_nameController.text.trim()}!'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Regisztrációs Űrlap')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 480),
            child: Form(
              key: _formKey,
              child: Card(
                elevation: 4,
                child: Padding(
                  padding: const EdgeInsets.all(28.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const Text(
                        'Kérjük, töltse ki az alábbi űrlapot',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const Divider(height: 32),

                      // Name field
                      const Icon(Icons.person_outline, size: 32),
                      const SizedBox(height: 8),
                      const Text(
                        'Teljes Név',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 12),
                      TextFormField(
                        controller: _nameController,
                        decoration: const InputDecoration(
                          labelText: 'Teljes név',
                          hintText: 'Adja meg teljes nevét',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.person),
                          helperText: 'Legalább 15 karakter szükséges',
                        ),
                        validator: (value) {
                          if (value == null || value.trim().isEmpty) {
                            return 'Tartalom nem érhető el';
                          }
                          if (value.trim().length < 15) {
                            return 'Tartalom nem érhető el';
                          }
                          return null;
                        },
                      ),
                      const Divider(height: 32),

                      // Age confirmation
                      const Icon(Icons.cake_outlined, size: 32),
                      const SizedBox(height: 8),
                      const Text(
                        'Életkor megerősítése',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: _ageConfirmController,
                        enabled: false,
                        decoration: InputDecoration(
                          labelText: '18 éves vagy idősebb?',
                          border: const OutlineInputBorder(),
                          prefixIcon: const Icon(Icons.cake),
                          suffixText: _isAdult ? 'Igen' : 'Nem',
                          suffixStyle: TextStyle(
                            color: _isAdult ? Colors.green : Colors.red,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Checkbox(
                            value: _isAdult,
                            onChanged: (value) =>
                                setState(() => _isAdult = value ?? false),
                          ),
                          const Expanded(
                            child: Text(
                              'Megerősítem, hogy 18 éves vagy idősebb vagyok.',
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ],
                      ),
                      const Divider(height: 32),

                      // Submit button
                      SizedBox(
                        width: double.infinity,
                        child: FilledButton.icon(
                          onPressed: _submit,
                          icon: const Icon(Icons.check),
                          label: const Text('Beküldés'),
                        ),
                      ),

                      // Result display
                      if (_submittedName != null) ...[
                        const SizedBox(height: 20),
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.green.shade50,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.green.shade200),
                          ),
                          child: Column(
                            children: [
                              const Icon(
                                Icons.verified_user,
                                color: Colors.green,
                                size: 32,
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Regisztrálva: $_submittedName',
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 4),
                              const Text(
                                '18+ megerősítve',
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
