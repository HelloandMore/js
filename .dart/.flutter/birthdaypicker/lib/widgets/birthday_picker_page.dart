import 'package:flutter/material.dart';
import 'birthday_result_widget.dart';

class BirthdayPickerPage extends StatefulWidget {
  const BirthdayPickerPage({super.key});

  @override
  State<BirthdayPickerPage> createState() => _BirthdayPickerPageState();
}

class _BirthdayPickerPageState extends State<BirthdayPickerPage> {
  final _formKey = GlobalKey<FormState>();
  final _dateController = TextEditingController();
  DateTime? _selectedDate;
  bool _validated = false;

  String _formatDate(DateTime date) {
    final y = date.year.toString().padLeft(4, '0');
    final m = date.month.toString().padLeft(2, '0');
    final d = date.day.toString().padLeft(2, '0');
    return '$y.$m.$d';
  }

  int _calculateAge(DateTime birthDate) {
    final today = DateTime.now();
    int age = today.year - birthDate.year;
    if (today.month < birthDate.month ||
        (today.month == birthDate.month && today.day < birthDate.day)) {
      age--;
    }
    return age;
  }

  bool _isTodayBirthday(DateTime birthDate) {
    final today = DateTime.now();
    return today.month == birthDate.month && today.day == birthDate.day;
  }

  Future<void> _pickDate() async {
    final now = DateTime.now();
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime(now.year - 25),
      firstDate: DateTime(1900),
      lastDate: now,
    );
    if (picked != null) {
      setState(() {
        _selectedDate = picked;
        _dateController.text = _formatDate(picked);
        _validated = false;
      });
    }
  }

  String? _validateDate(String? value) {
    if (value == null || value.isEmpty || _selectedDate == null) {
      return 'Kötelező mező';
    }
    final now = DateTime.now();
    if (_selectedDate!.isAfter(now)) {
      return 'A születési dátum nem lehet jövőbeli';
    }
    if (_calculateAge(_selectedDate!) < 18) {
      return 'Legalább 18 évesnek kell lennie';
    }
    return null;
  }

  void _onSubmit() {
    final isValid = _formKey.currentState?.validate() ?? false;
    setState(() {
      _validated = isValid;
    });
  }

  @override
  void dispose() {
    _dateController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final showResults = _validated && _selectedDate != null;
    final isBirthday = showResults && _isTodayBirthday(_selectedDate!);
    final age = showResults ? _calculateAge(_selectedDate!) : null;

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF6A11CB), Color(0xFFBC4E9C), Color(0xFFFF6B6B)],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 440),
                child: Card(
                  elevation: 16,
                  shadowColor: Colors.black38,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(28),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(28),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.cake_rounded,
                            size: 60,
                            color: Color(0xFF6A11CB),
                          ),
                          const SizedBox(height: 12),
                          const Text(
                            'Születési dátum kiválasztó',
                            style: TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF3D0066),
                            ),
                            textAlign: TextAlign.center,
                          ),
                          const SizedBox(height: 28),
                          TextFormField(
                            controller: _dateController,
                            readOnly: true,
                            onTap: _pickDate,
                            validator: _validateDate,
                            decoration: InputDecoration(
                              labelText: 'Születési dátum',
                              hintText: 'yyyy.MM.dd',
                              prefixIcon: const Icon(Icons.calendar_today),
                              suffixIcon: IconButton(
                                icon: const Icon(Icons.edit_calendar),
                                onPressed: _pickDate,
                              ),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(14),
                              ),
                              filled: true,
                              fillColor: Colors.grey.shade50,
                            ),
                          ),
                          const SizedBox(height: 20),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: _onSubmit,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF6A11CB),
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(
                                  vertical: 15,
                                ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(14),
                                ),
                                elevation: 4,
                              ),
                              child: const Text(
                                'Meghatározás',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                          if (showResults) ...[
                            const SizedBox(height: 28),
                            const Divider(thickness: 1.5),
                            const SizedBox(height: 20),
                            BirthdayResultWidget(
                              formattedDate: _formatDate(_selectedDate!),
                              age: age!,
                              isBirthday: isBirthday,
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
        ),
      ),
    );
  }
}
