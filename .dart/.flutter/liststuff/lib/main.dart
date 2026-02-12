import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'School App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  final List<String> schoolClasses = const [
    'Mathematics',
    'English Literature',
    'Physics',
    'Chemistry',
    'History',
    'Computer Science',
    'Physical Education',
    'Biology',
    'Geography',
    'Art',
  ];

  final List<Map<String, dynamic>> graduationSubjects = const [
    {'name': 'Advanced Math', 'icon': Icons.calculate},
    {'name': 'English Lit', 'icon': Icons.book},
    {'name': 'Physics', 'icon': Icons.science},
    {'name': 'Chemistry', 'icon': Icons.biotech},
    {'name': 'Biology', 'icon': Icons.nature},
    {'name': 'History', 'icon': Icons.history_edu},
    {'name': 'Geography', 'icon': Icons.public},
    {'name': 'Economics', 'icon': Icons.attach_money},
    {'name': 'Computer Sci', 'icon': Icons.computer},
    {'name': 'Art & Design', 'icon': Icons.palette},
    {'name': 'Music', 'icon': Icons.music_note},
    {'name': 'Physical Ed', 'icon': Icons.sports_soccer},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('School App')),
      body: Column(
        children: [
          // Task 1: School Classes
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Task 1: School Classes',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          SizedBox(
            height: 250,
            child: ListView.builder(
              itemCount: schoolClasses.length,
              itemBuilder: (context, index) {
                return ListTile(title: Text(schoolClasses[index]));
              },
            ),
          ),
          const Divider(),
          // Task 2: Graduation Subjects
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Task 2: Graduation Subjects',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.all(8),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
              ),
              itemCount: graduationSubjects.length,
              itemBuilder: (context, index) {
                final subject = graduationSubjects[index];
                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(subject['icon'] as IconData, size: 32),
                    const SizedBox(height: 8),
                    Text(
                      subject['name']!,
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 12),
                    ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
