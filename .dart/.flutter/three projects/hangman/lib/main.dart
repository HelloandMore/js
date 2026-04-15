import 'package:flutter/material.dart';

void main() {
  runApp(const HangmanApp());
}

class HangmanApp extends StatelessWidget {
  const HangmanApp({super.key});

  @override
  Widget build(BuildContext context) {
    const seed = Color(0xFFB45309);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Hangman',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: seed),
        scaffoldBackgroundColor: const Color(0xFFFFF8F1),
        appBarTheme: const AppBarTheme(centerTitle: true),
      ),
      home: const HangmanPage(),
    );
  }
}

const List<String> _wordList = [
  'flutter',
  'keyboard',
  'builder',
  'gallery',
  'notebook',
  'planet',
  'dynamic',
  'library',
  'canvas',
  'oxygen',
  'harvest',
  'journey',
  'village',
  'window',
  'puzzle',
  'orchard',
  'rocket',
  'thunder',
  'cascade',
  'sunrise',
  'venture',
  'mountain',
];

class HangmanPage extends StatefulWidget {
  const HangmanPage({super.key});

  @override
  State<HangmanPage> createState() => _HangmanPageState();
}

class _HangmanPageState extends State<HangmanPage> {
  late String _secretWord;
  final Set<String> _guessedLetters = <String>{};
  bool _gameOver = false;
  bool _won = false;

  static const int maxWrongGuesses = 6;

  @override
  void initState() {
    super.initState();
    _startNewGame();
  }

  void _startNewGame() {
    final words = List<String>.from(_wordList)..shuffle();
    setState(() {
      _secretWord = words.first.toUpperCase();
      _guessedLetters.clear();
      _gameOver = false;
      _won = false;
    });
  }

  int get _wrongGuesses =>
      _guessedLetters.where((letter) => !_secretWord.contains(letter)).length;

  int get _remainingAttempts => maxWrongGuesses - _wrongGuesses;

  String get _displayWord {
    return _secretWord
        .split('')
        .map((letter) => _guessedLetters.contains(letter) ? letter : '_')
        .join(' ');
  }

  void _guessLetter(String letter) {
    if (_gameOver || _guessedLetters.contains(letter)) return;

    setState(() {
      _guessedLetters.add(letter);

      final guessedAllLetters = _secretWord
          .split('')
          .every(_guessedLetters.contains);
      final outOfAttempts = _wrongGuesses >= maxWrongGuesses;

      if (guessedAllLetters) {
        _gameOver = true;
        _won = true;
      } else if (outOfAttempts) {
        _gameOver = true;
        _won = false;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Hangman'),
        actions: [
          TextButton.icon(
            onPressed: _startNewGame,
            icon: const Icon(Icons.refresh),
            label: const Text('Reset'),
          ),
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFFFF8F1), Color(0xFFFFE9D5), Color(0xFFFFD7BA)],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 860),
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
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: _MetricTile(
                                label: 'Remaining attempts',
                                value: _remainingAttempts.toString(),
                                icon: Icons.favorite,
                                accent: theme.colorScheme.primary,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: _MetricTile(
                                label: 'Wrong guesses',
                                value: _wrongGuesses.toString(),
                                icon: Icons.close,
                                accent: const Color(0xFFDC2626),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),
                        Container(
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.primaryContainer
                                .withValues(alpha: 0.55),
                            borderRadius: BorderRadius.circular(28),
                          ),
                          child: Column(
                            children: [
                              SizedBox(
                                height: 260,
                                child: CustomPaint(
                                  painter: HangmanPainter(stage: _wrongGuesses),
                                  child: const SizedBox.expand(),
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                _gameOver
                                    ? 'The word was $_secretWord'
                                    : 'Guess the word one letter at a time.',
                                style: theme.textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w600,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),
                        Text(
                          _displayWord,
                          textAlign: TextAlign.center,
                          style: theme.textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.w900,
                            letterSpacing: 4,
                          ),
                        ),
                        const SizedBox(height: 20),
                        Wrap(
                          alignment: WrapAlignment.center,
                          spacing: 8,
                          runSpacing: 8,
                          children: List.generate(26, (index) {
                            final letter = String.fromCharCode(65 + index);
                            final used = _guessedLetters.contains(letter);
                            final correct = _secretWord.contains(letter);
                            return SizedBox(
                              width: 42,
                              height: 42,
                              child: ElevatedButton(
                                onPressed: used || _gameOver
                                    ? null
                                    : () => _guessLetter(letter),
                                style: ElevatedButton.styleFrom(
                                  padding: EdgeInsets.zero,
                                  backgroundColor: used
                                      ? (correct
                                            ? Colors.green.shade100
                                            : Colors.red.shade100)
                                      : theme.colorScheme.surface,
                                  foregroundColor: used
                                      ? (correct
                                            ? Colors.green.shade900
                                            : Colors.red.shade900)
                                      : theme.colorScheme.onSurface,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(14),
                                  ),
                                ),
                                child: Text(
                                  letter,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ),
                            );
                          }),
                        ),
                        const SizedBox(height: 24),
                        if (_gameOver)
                          _ResultPanel(
                            won: _won,
                            secretWord: _secretWord,
                            onPlayAgain: _startNewGame,
                          )
                        else
                          OutlinedButton.icon(
                            onPressed: _startNewGame,
                            icon: const Icon(Icons.restart_alt),
                            label: const Text('New Word'),
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

class _MetricTile extends StatelessWidget {
  const _MetricTile({
    required this.label,
    required this.value,
    required this.icon,
    required this.accent,
  });

  final String label;
  final String value;
  final IconData icon;
  final Color accent;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: accent.withValues(alpha: 0.09),
        borderRadius: BorderRadius.circular(22),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: accent.withValues(alpha: 0.15),
            child: Icon(icon, color: accent),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: theme.textTheme.labelLarge),
                Text(
                  value,
                  style: theme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w800,
                    color: accent,
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

class HangmanPainter extends CustomPainter {
  HangmanPainter({required this.stage});

  final int stage;

  @override
  void paint(Canvas canvas, Size size) {
    final scaffoldPaint = Paint()
      ..color = const Color(0xFF7C4A1E)
      ..strokeWidth = 8
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final bodyPaint = Paint()
      ..color = const Color(0xFF1F2937)
      ..strokeWidth = 6
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final baseY = size.height * 0.86;
    final poleX = size.width * 0.22;
    final beamTop = size.height * 0.1;
    final beamEndX = size.width * 0.58;
    final headCenter = Offset(size.width * 0.58, size.height * 0.28);

    canvas.drawLine(
      Offset(size.width * 0.06, baseY),
      Offset(size.width * 0.78, baseY),
      scaffoldPaint,
    );
    canvas.drawLine(
      Offset(poleX, baseY),
      Offset(poleX, beamTop),
      scaffoldPaint,
    );
    canvas.drawLine(
      Offset(poleX, beamTop),
      Offset(beamEndX, beamTop),
      scaffoldPaint,
    );
    canvas.drawLine(
      Offset(beamEndX, beamTop),
      Offset(beamEndX, size.height * 0.18),
      scaffoldPaint,
    );

    if (stage > 0) {
      canvas.drawCircle(headCenter, size.width * 0.08, bodyPaint);
    }
    if (stage > 1) {
      canvas.drawLine(
        Offset(headCenter.dx, headCenter.dy + size.width * 0.08),
        Offset(headCenter.dx, size.height * 0.52),
        bodyPaint,
      );
    }
    if (stage > 2) {
      canvas.drawLine(
        Offset(headCenter.dx, size.height * 0.38),
        Offset(headCenter.dx - size.width * 0.11, size.height * 0.47),
        bodyPaint,
      );
    }
    if (stage > 3) {
      canvas.drawLine(
        Offset(headCenter.dx, size.height * 0.38),
        Offset(headCenter.dx + size.width * 0.11, size.height * 0.47),
        bodyPaint,
      );
    }
    if (stage > 4) {
      canvas.drawLine(
        Offset(headCenter.dx, size.height * 0.52),
        Offset(headCenter.dx - size.width * 0.11, size.height * 0.67),
        bodyPaint,
      );
    }
    if (stage > 5) {
      canvas.drawLine(
        Offset(headCenter.dx, size.height * 0.52),
        Offset(headCenter.dx + size.width * 0.11, size.height * 0.67),
        bodyPaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant HangmanPainter oldDelegate) =>
      oldDelegate.stage != stage;
}

class _ResultPanel extends StatelessWidget {
  const _ResultPanel({
    required this.won,
    required this.secretWord,
    required this.onPlayAgain,
  });

  final bool won;
  final String secretWord;
  final VoidCallback onPlayAgain;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: won ? Colors.green.shade50 : Colors.red.shade50,
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          Icon(
            won ? Icons.emoji_events : Icons.sentiment_dissatisfied,
            color: won ? Colors.green : Colors.red,
            size: 44,
          ),
          const SizedBox(height: 8),
          Text(
            won ? 'You win!' : 'Game over',
            style: theme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            'The correct word was $secretWord',
            style: theme.textTheme.titleMedium,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 14),
          FilledButton.icon(
            onPressed: onPlayAgain,
            icon: const Icon(Icons.replay),
            label: const Text('Play Again'),
          ),
        ],
      ),
    );
  }
}
