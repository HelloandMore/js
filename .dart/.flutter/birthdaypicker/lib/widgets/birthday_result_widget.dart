import 'package:flutter/material.dart';

class BirthdayResultWidget extends StatelessWidget {
  const BirthdayResultWidget({
    super.key,
    required this.formattedDate,
    required this.age,
    required this.isBirthday,
  });

  final String formattedDate;
  final int age;
  final bool isBirthday;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (isBirthday) ...[
          const Text('🎂', style: TextStyle(fontSize: 90)),
          const SizedBox(height: 12),
          const Text(
            'Boldog születésnapot! 🎉',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: Color(0xFFBC4E9C),
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
        ],
        Text(
          'Kiválasztott dátum:',
          style: TextStyle(color: Colors.grey.shade600, fontSize: 14),
        ),
        const SizedBox(height: 6),
        Text(
          formattedDate,
          style: const TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
            color: Color(0xFF3D0066),
            letterSpacing: 2,
          ),
        ),
        const SizedBox(height: 20),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF6A11CB), Color(0xFFBC4E9C)],
            ),
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.deepPurple.withValues(alpha: 0.3),
                blurRadius: 8,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Text(
            '$age éves',
            style: const TextStyle(
              fontSize: 30,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ],
    );
  }
}
