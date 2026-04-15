import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  runApp(const GuessingApp());
}

class GuessingApp extends StatelessWidget {
  const GuessingApp({super.key});

  @override
  Widget build(BuildContext context) {
    const seed = Color(0xFF0F766E);
    final colorScheme = ColorScheme.fromSeed(
      seedColor: seed,
      brightness: Brightness.light,
    );

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Number Guessing Game',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: colorScheme,
        scaffoldBackgroundColor: const Color(0xFFF4FBF9),
        appBarTheme: const AppBarTheme(centerTitle: true),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(20),
            borderSide: BorderSide.none,
          ),
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 20,
            vertical: 18,
          ),
        ),
      ),
      home: const NumberGuessingPage(),
    );
  }
}

class NumberGuessingPage extends StatefulWidget {
  const NumberGuessingPage({super.key});

  @override
  State<NumberGuessingPage> createState() => _NumberGuessingPageState();
}

class _NumberGuessingPageState extends State<NumberGuessingPage> {
  final Random _random = Random();
  final TextEditingController _controller = TextEditingController();
  late int _targetNumber;
  int _attempts = 0;
  String _feedback = 'Guess a number between 1 and 100.';
  bool _won = false;

  @override
  void initState() {
    super.initState();
    _startNewGame();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _startNewGame() {
    setState(() {
      _targetNumber = _random.nextInt(100) + 1;
      _attempts = 0;
      _feedback = 'Guess a number between 1 and 100.';
      _won = false;
      _controller.clear();
    });
  }

  void _submitGuess() {
    final guess = int.tryParse(_controller.text.trim());
    if (guess == null || guess < 1 || guess > 100) {
      setState(() => _feedback = 'Please enter a valid number from 1 to 100.');
      return;
    }

    setState(() {
      _attempts += 1;
      if (guess < _targetNumber) {
        _feedback = 'Too low';
      } else if (guess > _targetNumber) {
        _feedback = 'Too high';
      } else {
        _won = true;
      }
    });

    if (_won) {
      showModalBottomSheet<void>(
        context: context,
        isScrollControlled: true,
        backgroundColor: Colors.transparent,
        builder: (context) {
          return _VictorySheet(
            attempts: _attempts,
            onPlayAgain: () {
              Navigator.of(context).pop();
              _startNewGame();
            },
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Number Guessing Game')),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFF4FBF9), Color(0xFFE6F6F3), Color(0xFFD6F0EB)],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 520),
                child: Card(
                  elevation: 0,
                  color: Colors.white.withValues(alpha: 0.92),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(32),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        _StatusBanner(attempts: _attempts, won: _won),
                        const SizedBox(height: 20),
                        Text(
                          'I am thinking of a number between 1 and 100.',
                          style: theme.textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 12),
                        Text(
                          _feedback,
                          style: theme.textTheme.titleMedium?.copyWith(
                            color: _won
                                ? theme.colorScheme.primary
                                : theme.colorScheme.onSurfaceVariant,
                            fontWeight: FontWeight.w600,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 24),
                        TextField(
                          controller: _controller,
                          enabled: !_won,
                          keyboardType: TextInputType.number,
                          textInputAction: TextInputAction.done,
                          onSubmitted: (_) => _submitGuess(),
                          decoration: const InputDecoration(
                            labelText: 'Your guess',
                            prefixIcon: Icon(Icons.tag),
                          ),
                        ),
                        const SizedBox(height: 16),
                        FilledButton.icon(
                          onPressed: _won ? null : _submitGuess,
                          icon: const Icon(Icons.search),
                          label: const Text('Check Guess'),
                        ),
                        const SizedBox(height: 12),
                        OutlinedButton.icon(
                          onPressed: _startNewGame,
                          icon: const Icon(Icons.refresh),
                          label: const Text('Restart Game'),
                        ),
                      ],
                    ),
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

class _StatusBanner extends StatelessWidget {
  const _StatusBanner({required this.attempts, required this.won});

  final int attempts;
  final bool won;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: won
              ? [const Color(0xFF10B981), const Color(0xFF34D399)]
              : [const Color(0xFF14B8A6), const Color(0xFF0EA5E9)],
        ),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Row(
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.18),
              shape: BoxShape.circle,
            ),
            child: Icon(
              won ? Icons.emoji_events : Icons.radar,
              color: Colors.white,
              size: 30,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Attempts',
                  style: theme.textTheme.labelLarge?.copyWith(
                    color: Colors.white70,
                  ),
                ),
                Text(
                  '$attempts',
                  style: theme.textTheme.headlineMedium?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _VictorySheet extends StatelessWidget {
  const _VictorySheet({required this.attempts, required this.onPlayAgain});

  final int attempts;
  final VoidCallback onPlayAgain;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.surface,
            borderRadius: BorderRadius.circular(32),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.celebration, size: 64, color: Color(0xFF10B981)),
              const SizedBox(height: 12),
              Text(
                'Congratulations!',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'You guessed the number in $attempts attempts.',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 20),
              FilledButton(
                onPressed: onPlayAgain,
                child: const Text('Play Again'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
