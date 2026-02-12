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
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

// Home Screen with navigation to both tasks
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('School App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton.icon(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const SchoolClassesScreen(),
                  ),
                );
              },
              icon: const Icon(Icons.list),
              label: const Text('Task 1: School Classes'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: 32,
                  vertical: 16,
                ),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const GraduationSubjectsScreen(),
                  ),
                );
              },
              icon: const Icon(Icons.grid_view),
              label: const Text('Task 2: Graduation Subjects'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: 32,
                  vertical: 16,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Task 1: School Classes displayed in ListView
class SchoolClassesScreen extends StatelessWidget {
  const SchoolClassesScreen({super.key});

  final List<Map<String, String>> schoolClasses = const [
    {
      'name': 'Mathematics',
      'teacher': 'Mr. Johnson',
      'time': '8:00 AM - 9:00 AM',
    },
    {
      'name': 'English Literature',
      'teacher': 'Ms. Smith',
      'time': '9:15 AM - 10:15 AM',
    },
    {'name': 'Physics', 'teacher': 'Dr. Brown', 'time': '10:30 AM - 11:30 AM'},
    {
      'name': 'Chemistry',
      'teacher': 'Mrs. Davis',
      'time': '11:45 AM - 12:45 PM',
    },
    {'name': 'History', 'teacher': 'Mr. Wilson', 'time': '1:30 PM - 2:30 PM'},
    {
      'name': 'Computer Science',
      'teacher': 'Ms. Taylor',
      'time': '2:45 PM - 3:45 PM',
    },
    {
      'name': 'Physical Education',
      'teacher': 'Coach Martinez',
      'time': '4:00 PM - 5:00 PM',
    },
    {'name': 'Biology', 'teacher': 'Dr. Anderson', 'time': '8:00 AM - 9:00 AM'},
    {
      'name': 'Geography',
      'teacher': 'Mr. Thomas',
      'time': '9:15 AM - 10:15 AM',
    },
    {'name': 'Art', 'teacher': 'Ms. Garcia', 'time': '10:30 AM - 11:30 AM'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('School Classes'),
      ),
      body: ListView.builder(
        itemCount: schoolClasses.length,
        itemBuilder: (context, index) {
          final classInfo = schoolClasses[index];
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            elevation: 2,
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: Theme.of(context).colorScheme.primary,
                child: Text(
                  '${index + 1}',
                  style: const TextStyle(color: Colors.white),
                ),
              ),
              title: Text(
                classInfo['name']!,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 4),
                  Text('Teacher: ${classInfo['teacher']}'),
                  Text('Time: ${classInfo['time']}'),
                ],
              ),
              trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            ),
          );
        },
      ),
    );
  }
}

// Task 2: High School Graduation Subjects in GridView
class GraduationSubjectsScreen extends StatelessWidget {
  const GraduationSubjectsScreen({super.key});

  final List<Map<String, dynamic>> graduationSubjects = const [
    {'name': 'Advanced Math', 'icon': Icons.calculate, 'color': Colors.blue},
    {'name': 'English Lit', 'icon': Icons.book, 'color': Colors.green},
    {'name': 'Physics', 'icon': Icons.science, 'color': Colors.purple},
    {'name': 'Chemistry', 'icon': Icons.biotech, 'color': Colors.orange},
    {'name': 'Biology', 'icon': Icons.nature, 'color': Colors.teal},
    {'name': 'History', 'icon': Icons.history_edu, 'color': Colors.brown},
    {'name': 'Geography', 'icon': Icons.public, 'color': Colors.indigo},
    {'name': 'Economics', 'icon': Icons.attach_money, 'color': Colors.amber},
    {'name': 'Computer Sci', 'icon': Icons.computer, 'color': Colors.cyan},
    {'name': 'Art & Design', 'icon': Icons.palette, 'color': Colors.pink},
    {'name': 'Music', 'icon': Icons.music_note, 'color': Colors.deepPurple},
    {'name': 'Physical Ed', 'icon': Icons.sports_soccer, 'color': Colors.red},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Graduation Subjects'),
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 1.2,
        ),
        itemCount: graduationSubjects.length,
        itemBuilder: (context, index) {
          final subject = graduationSubjects[index];
          return Card(
            elevation: 4,
            color: (subject['color'] as Color).withValues(alpha: 0.1),
            child: InkWell(
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Selected: ${subject['name']}'),
                    duration: const Duration(seconds: 1),
                  ),
                );
              },
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    subject['icon'] as IconData,
                    size: 48,
                    color: subject['color'] as Color,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    subject['name']!,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: subject['color'] as Color,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
