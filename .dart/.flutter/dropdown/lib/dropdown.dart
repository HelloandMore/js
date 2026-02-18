import 'package:flutter/material.dart';

class DropdownButtonExample extends StatefulWidget {
  const DropdownButtonExample({super.key});

  @override
  State<DropdownButtonExample> createState() {
    return _DropdownButtonExampleState();
  }
}

class _DropdownButtonExampleState extends State<DropdownButtonExample> {
  List<String> countries = ['India', 'USA', 'UK', 'Canada'];
  late String selectedCountry;

  List<String> subjects = [
    'Matematika',
    'Fizika',
    'Kémia',
    'Biológia',
    'Történelem',
    'Angol',
  ];
  late String selectedSubject;

  List<String> diplomaTypes = ['Érettségi', 'Emelt szintű érettségi'];
  late String selectedDiplomaType;

  @override
  void initState() {
    super.initState();
    selectedCountry = countries[0];
    selectedSubject = subjects[0];
    selectedDiplomaType = diplomaTypes[0];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1C1C2E),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              DropdownButton<String>(
                value: selectedCountry,
                dropdownColor: const Color(0xFF2A2A3E),
                iconEnabledColor: Colors.white,
                style: const TextStyle(color: Colors.white, fontSize: 18),
                underline: Container(height: 2, color: Colors.blueAccent),
                onChanged: (String? newValue) {
                  setState(() {
                    selectedCountry = newValue!;
                  });
                },
                items: countries.map<DropdownMenuItem<String>>((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value),
                  );
                }).toList(),
              ),
              const SizedBox(height: 12),
              Text(
                'Selected country: $selectedCountry',
                style: const TextStyle(color: Colors.white70, fontSize: 16),
              ),
              const SizedBox(height: 36),
              DropdownButton<String>(
                value: selectedSubject,
                dropdownColor: const Color(0xFF2A2A3E),
                iconEnabledColor: Colors.white,
                style: const TextStyle(color: Colors.white, fontSize: 18),
                underline: Container(height: 2, color: Colors.blueAccent),
                onChanged: (String? newValue) {
                  setState(() {
                    selectedSubject = newValue!;
                  });
                },
                items: subjects.map<DropdownMenuItem<String>>((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value),
                  );
                }).toList(),
              ),
              const SizedBox(height: 20),
              DropdownButton<String>(
                value: selectedDiplomaType,
                dropdownColor: const Color(0xFF2A2A3E),
                iconEnabledColor: Colors.white,
                style: const TextStyle(color: Colors.white, fontSize: 18),
                underline: Container(height: 2, color: Colors.blueAccent),
                onChanged: (String? newValue) {
                  setState(() {
                    selectedDiplomaType = newValue!;
                  });
                },
                items: diplomaTypes.map<DropdownMenuItem<String>>((
                  String value,
                ) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value),
                  );
                }).toList(),
              ),
              const SizedBox(height: 24),
              Text(
                'Válaszott: $selectedSubject – $selectedDiplomaType',
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }
}
