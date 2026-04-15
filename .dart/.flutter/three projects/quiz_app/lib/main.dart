import 'dart:async';

import 'package:flutter/material.dart';

void main() {
  runApp(const QuizApp());
}

class QuizApp extends StatelessWidget {
  const QuizApp({super.key});

  @override
  Widget build(BuildContext context) {
    const seed = Color(0xFF4F46E5);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Quiz App',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: seed),
        scaffoldBackgroundColor: const Color(0xFFF6F7FF),
        appBarTheme: const AppBarTheme(centerTitle: true),
      ),
      home: const QuizHomePage(),
    );
  }
}

class QuizQuestion {
  const QuizQuestion({
    required this.question,
    required this.options,
    required this.correctIndex,
  });

  final String question;
  final List<String> options;
  final int correctIndex;
}

const List<QuizQuestion> _questions = [
  QuizQuestion(
    question: 'What is the capital of Japan?',
    options: ['Seoul', 'Tokyo', 'Kyoto', 'Osaka'],
    correctIndex: 1,
  ),
  QuizQuestion(
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
    correctIndex: 1,
  ),
  QuizQuestion(
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
    correctIndex: 2,
  ),
  QuizQuestion(
    question: 'Who wrote Romeo and Juliet?',
    options: [
      'Charles Dickens',
      'William Shakespeare',
      'Jane Austen',
      'Mark Twain',
    ],
    correctIndex: 1,
  ),
  QuizQuestion(
    question: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Nitrogen'],
    correctIndex: 2,
  ),
  QuizQuestion(
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correctIndex: 2,
  ),
  QuizQuestion(
    question: 'What is the square root of 144?',
    options: ['10', '11', '12', '13'],
    correctIndex: 2,
  ),
  QuizQuestion(
    question: 'Which element has the chemical symbol Au?',
    options: ['Silver', 'Gold', 'Argon', 'Copper'],
    correctIndex: 1,
  ),
  QuizQuestion(
    question: 'Which country hosted the 2020 Summer Olympics?',
    options: ['China', 'Brazil', 'Japan', 'Greece'],
    correctIndex: 2,
  ),
  QuizQuestion(
    question: 'What is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Horse', 'Gazelle'],
    correctIndex: 1,
  ),
];

class QuizHomePage extends StatefulWidget {
  const QuizHomePage({super.key});

  @override
  State<QuizHomePage> createState() => _QuizHomePageState();
}

class _QuizHomePageState extends State<QuizHomePage> {
  int _questionIndex = 0;
  int _score = 0;
  int? _selectedIndex;
  bool _answerLocked = false;
  bool _showResults = false;
  Timer? _advanceTimer;

  @override
  void dispose() {
    _advanceTimer?.cancel();
    super.dispose();
  }

  void _restartQuiz() {
    _advanceTimer?.cancel();
    setState(() {
      _questionIndex = 0;
      _score = 0;
      _selectedIndex = null;
      _answerLocked = false;
      _showResults = false;
    });
  }

  void _selectAnswer(int index) {
    if (_answerLocked) return;

    final question = _questions[_questionIndex];
    final isCorrect = index == question.correctIndex;

    setState(() {
      _selectedIndex = index;
      _answerLocked = true;
      if (isCorrect) {
        _score += 1;
      }
    });

    _advanceTimer?.cancel();
    _advanceTimer = Timer(
      const Duration(milliseconds: 900),
      _advanceToNextStep,
    );
  }

  void _advanceToNextStep() {
    if (!mounted) return;
    if (_questionIndex == _questions.length - 1) {
      setState(() {
        _selectedIndex = null;
        _answerLocked = false;
        _showResults = true;
      });
      return;
    }

    setState(() {
      _questionIndex += 1;
      _selectedIndex = null;
      _answerLocked = false;
    });
  }

  double get _progress => (_questionIndex + 1) / _questions.length;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final question = _questions[_questionIndex];

    return Scaffold(
      appBar: AppBar(title: const Text('Quiz Challenge')),
      body: DecoratedBox(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFFF7F8FF), Color(0xFFF0F3FF), Color(0xFFE7ECFF)],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 720),
                child:
                    _questionIndex == _questions.length - 1 &&
                        _answerLocked &&
                        _selectedIndex != null
                    ? _showResults
                          ? _QuizResultsCard(
                              score: _score,
                              total: _questions.length,
                              onRestart: _restartQuiz,
                            )
                          : Card(
                              elevation: 0,
                              color: Colors.white.withValues(alpha: 0.94),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(32),
                              ),
                              child: const Padding(
                                padding: EdgeInsets.all(28),
                                child: Center(
                                  child: CircularProgressIndicator(),
                                ),
                              ),
                            )
                    : Card(
                        elevation: 0,
                        color: Colors.white.withValues(alpha: 0.94),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(32),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(24),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: ClipRRect(
                                      borderRadius: BorderRadius.circular(999),
                                      child: LinearProgressIndicator(
                                        value: _progress,
                                        minHeight: 10,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 16),
                                  Text(
                                    '${_questionIndex + 1}/${_questions.length}',
                                    style: theme.textTheme.titleMedium
                                        ?.copyWith(fontWeight: FontWeight.w700),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 24),
                              Container(
                                padding: const EdgeInsets.all(20),
                                decoration: BoxDecoration(
                                  color: theme.colorScheme.primaryContainer
                                      .withValues(alpha: 0.7),
                                  borderRadius: BorderRadius.circular(28),
                                ),
                                child: Text(
                                  question.question,
                                  style: theme.textTheme.headlineSmall
                                      ?.copyWith(fontWeight: FontWeight.w800),
                                ),
                              ),
                              const SizedBox(height: 20),
                              ...List.generate(question.options.length, (
                                index,
                              ) {
                                final option = question.options[index];
                                final isSelected = _selectedIndex == index;
                                final isCorrect =
                                    index == question.correctIndex;
                                Color? background;
                                Color? foreground;
                                IconData? icon;

                                if (_answerLocked) {
                                  if (isCorrect) {
                                    background = Colors.green.shade100;
                                    foreground = Colors.green.shade900;
                                    icon = Icons.check_circle;
                                  } else if (isSelected) {
                                    background = Colors.red.shade100;
                                    foreground = Colors.red.shade900;
                                    icon = Icons.cancel;
                                  }
                                }

                                return Padding(
                                  padding: const EdgeInsets.only(bottom: 12),
                                  child: AnimatedContainer(
                                    duration: const Duration(milliseconds: 220),
                                    decoration: BoxDecoration(
                                      color:
                                          background ?? const Color(0xFFF7F8FC),
                                      borderRadius: BorderRadius.circular(22),
                                      border: Border.all(
                                        color: isSelected && !_answerLocked
                                            ? theme.colorScheme.primary
                                            : Colors.transparent,
                                        width: 1.2,
                                      ),
                                    ),
                                    child: ListTile(
                                      onTap: _answerLocked
                                          ? null
                                          : () => _selectAnswer(index),
                                      contentPadding:
                                          const EdgeInsets.symmetric(
                                            horizontal: 18,
                                            vertical: 4,
                                          ),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(22),
                                      ),
                                      leading: CircleAvatar(
                                        backgroundColor: theme
                                            .colorScheme
                                            .primary
                                            .withValues(alpha: 0.12),
                                        child: Text(
                                          String.fromCharCode(65 + index),
                                          style: TextStyle(
                                            color: theme.colorScheme.primary,
                                            fontWeight: FontWeight.w700,
                                          ),
                                        ),
                                      ),
                                      title: Text(
                                        option,
                                        style: theme.textTheme.titleMedium
                                            ?.copyWith(
                                              color: foreground,
                                              fontWeight: FontWeight.w600,
                                            ),
                                      ),
                                      trailing: icon == null
                                          ? null
                                          : Icon(icon, color: foreground),
                                    ),
                                  ),
                                );
                              }),
                              const SizedBox(height: 8),
                              FilledButton.icon(
                                onPressed: _restartQuiz,
                                icon: const Icon(Icons.restart_alt),
                                label: const Text('Restart Quiz'),
                              ),
                              const SizedBox(height: 12),
                              Text(
                                'Score: $_score',
                                textAlign: TextAlign.center,
                                style: theme.textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w700,
                                ),
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

class _QuizResultsCard extends StatelessWidget {
  const _QuizResultsCard({
    required this.score,
    required this.total,
    required this.onRestart,
  });

  final int score;
  final int total;
  final VoidCallback onRestart;

  String get _message {
    final percent = (score / total) * 100;
    if (percent >= 90) return 'Excellent!';
    if (percent >= 70) return 'Great job!';
    if (percent >= 50) return 'Not bad!';
    return 'Keep practicing';
  }

  @override
  Widget build(BuildContext context) {
    final percent = ((score / total) * 100).round();

    return Card(
      elevation: 0,
      color: Colors.white.withValues(alpha: 0.96),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(32)),
      child: Padding(
        padding: const EdgeInsets.all(28),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 88,
              height: 88,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(
                  colors: [Color(0xFF4F46E5), Color(0xFF8B5CF6)],
                ),
              ),
              child: const Icon(
                Icons.emoji_events,
                color: Colors.white,
                size: 44,
              ),
            ),
            const SizedBox(height: 18),
            Text(
              'Quiz Completed',
              style: Theme.of(
                context,
              ).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 10),
            Text(
              'You scored $score out of $total',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            Text(
              '$percent% - $_message',
              style: Theme.of(
                context,
              ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 24),
            FilledButton.icon(
              onPressed: onRestart,
              icon: const Icon(Icons.restart_alt),
              label: const Text('Restart Quiz'),
            ),
          ],
        ),
      ),
    );
  }
}
