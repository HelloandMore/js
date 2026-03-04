import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hotel Amenities',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
      ),
      home: const HotelAmenitiesForm(),
    );
  }
}

// ---------------------------------------------------------------------------
// Enum for room type — used with Radio buttons (radio_button_example.dart)
// ---------------------------------------------------------------------------
enum RoomType { single, double_, suite, deluxe }

// ---------------------------------------------------------------------------
// Main form page
// ---------------------------------------------------------------------------
class HotelAmenitiesForm extends StatefulWidget {
  const HotelAmenitiesForm({super.key});

  @override
  State<HotelAmenitiesForm> createState() => _HotelAmenitiesFormState();
}

class _HotelAmenitiesFormState extends State<HotelAmenitiesForm> {
  // ── Section 1: Room Type — Radio buttons (radio_button_example.dart) ──────
  RoomType _selectedRoomType = RoomType.single;

  // ── Section 2: Room Features — Checkboxes (checkbox_example.dart) ─────────
  bool _hasAirConditioning = false;
  bool _hasMiniBar = false;
  bool _hasSafe = false;
  bool _hasBalcony = false;

  // ── Section 3: Hotel Facilities — CheckboxListTile list ──────────────────
  //   (checkbox_options_example.dart)
  final List<String> _selectedFacilities = [];
  final List<String> _facilities = [
    'Swimming Pool',
    'Fitness Center',
    'Spa & Wellness',
    'Restaurant',
    'Bar & Lounge',
    'Parking',
    'Conference Room',
    'Business Center',
    'Kids Club',
    'Laundry Service',
  ];

  void _selectFacility(bool value, String facility) {
    setState(() {
      if (value) {
        _selectedFacilities.add(facility);
      } else {
        _selectedFacilities.remove(facility);
      }
    });
  }

  // ── Section 4: Included Services — SwitchListTile map (switch_example.dart)
  Map<String, bool> _includedServices = <String, bool>{
    'Breakfast': false,
    'Wi-Fi': true,
    'Room Service': false,
    'Laundry': false,
    'Airport Transfer': false,
  };

  // ── Section 5: Special Requests — Form Switches (switch_example.dart) ─────
  bool _earlyCheckIn = false;
  bool _lateCheckOut = false;
  bool _petFriendly = false;

  // ── Helpers ───────────────────────────────────────────────────────────────
  String _roomTypeLabel(RoomType type) {
    switch (type) {
      case RoomType.single:
        return 'Single Room';
      case RoomType.double_:
        return 'Double Room';
      case RoomType.suite:
        return 'Suite';
      case RoomType.deluxe:
        return 'Deluxe Room';
    }
  }

  Widget _sectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
      ),
    );
  }

  // Inline checkbox + label row (reusable, mirrors checkbox_example.dart)
  Widget _checkboxItem(
    String label,
    bool value,
    ValueChanged<bool?> onChanged,
  ) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Checkbox(value: value, onChanged: onChanged),
        Text(label),
      ],
    );
  }

  void _submitForm() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Booking Summary'),
        content: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('Room Type: ${_roomTypeLabel(_selectedRoomType)}'),
              const SizedBox(height: 8),
              Text('Air Conditioning: $_hasAirConditioning'),
              Text('Mini Bar: $_hasMiniBar'),
              Text('Safe: $_hasSafe'),
              Text('Balcony: $_hasBalcony'),
              const SizedBox(height: 8),
              Text(
                'Facilities: ${_selectedFacilities.isEmpty ? "None" : _selectedFacilities.join(", ")}',
              ),
              const SizedBox(height: 8),
              Text(
                'Services:\n${[for (var e in _includedServices.entries) '  ${e.key}: ${e.value}'].join('\n')}',
              ),
              const SizedBox(height: 8),
              Text('Early Check-in: $_earlyCheckIn'),
              Text('Late Check-out: $_lateCheckOut'),
              Text('Pet Friendly: $_petFriendly'),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  // ── Build ─────────────────────────────────────────────────────────────────
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Hotel Amenities Selection'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── 1. Room Type — Radio buttons ────────────────────────────────
            _sectionHeader('Room Type'),
            ...RoomType.values.map(
              (type) => RadioListTile<RoomType>(
                title: Text(_roomTypeLabel(type)),
                value: type,
                groupValue: _selectedRoomType,
                onChanged: (RoomType? value) {
                  setState(() {
                    _selectedRoomType = value!;
                  });
                },
              ),
            ),
            Text(
              'Selected: ${_roomTypeLabel(_selectedRoomType)}',
              style: const TextStyle(color: Colors.grey),
            ),
            const Divider(height: 30, thickness: 2),

            // ── 2. Room Features — Checkboxes ───────────────────────────────
            _sectionHeader('Room Features'),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _checkboxItem(
                  'Air Conditioning',
                  _hasAirConditioning,
                  (v) => setState(() => _hasAirConditioning = v!),
                ),
                _checkboxItem(
                  'Mini Bar',
                  _hasMiniBar,
                  (v) => setState(() => _hasMiniBar = v!),
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _checkboxItem(
                  'Safe',
                  _hasSafe,
                  (v) => setState(() => _hasSafe = v!),
                ),
                _checkboxItem(
                  'Balcony',
                  _hasBalcony,
                  (v) => setState(() => _hasBalcony = v!),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8),
              child: Text(
                'Air Conditioning: $_hasAirConditioning  |  Mini Bar: $_hasMiniBar\n'
                'Safe: $_hasSafe  |  Balcony: $_hasBalcony',
                style: const TextStyle(color: Colors.grey),
              ),
            ),
            const Divider(height: 30, thickness: 2),

            // ── 3. Hotel Facilities — CheckboxListTile list ─────────────────
            _sectionHeader('Hotel Facilities'),
            SizedBox(
              height: 340,
              child: ListView(
                children: _facilities.map((String facility) {
                  return CheckboxListTile(
                    title: Text(facility),
                    value: _selectedFacilities.contains(facility),
                    onChanged: (bool? value) {
                      _selectFacility(value!, facility);
                    },
                  );
                }).toList(),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8),
              child: Text(
                'Selected facilities:\n'
                '${[..._selectedFacilities..sort()].isEmpty ? "None" : [..._selectedFacilities..sort()].join(", ")}',
                style: const TextStyle(color: Colors.grey),
              ),
            ),
            const Divider(height: 30, thickness: 2),

            // ── 4. Included Services — SwitchListTile map ───────────────────
            _sectionHeader('Included Services'),
            SizedBox(
              height: 270,
              child: ListView(
                children: _includedServices.keys.map((String key) {
                  return SwitchListTile(
                    title: Text(key),
                    value: _includedServices[key]!,
                    onChanged: (bool value) {
                      setState(() {
                        _includedServices[key] = value;
                      });
                    },
                  );
                }).toList(),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8),
              child: Text(
                'Services:\n${[for (var e in _includedServices.entries) '${e.key}: ${e.value}'].join('\n')}',
                style: const TextStyle(color: Colors.grey),
              ),
            ),
            const Divider(height: 30, thickness: 2),

            // ── 5. Special Requests — Form Switches ─────────────────────────
            _sectionHeader('Special Requests'),
            Form(
              child: Column(
                children: [
                  SwitchListTile(
                    title: const Text('Early Check-in'),
                    value: _earlyCheckIn,
                    onChanged: (bool value) {
                      setState(() => _earlyCheckIn = value);
                    },
                  ),
                  SwitchListTile(
                    title: const Text('Late Check-out'),
                    value: _lateCheckOut,
                    onChanged: (bool value) {
                      setState(() => _lateCheckOut = value);
                    },
                  ),
                  SwitchListTile(
                    title: const Text('Pet Friendly Room'),
                    value: _petFriendly,
                    onChanged: (bool value) {
                      setState(() => _petFriendly = value);
                    },
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8),
              child: Text(
                'Early Check-in: $_earlyCheckIn  |  '
                'Late Check-out: $_lateCheckOut  |  '
                'Pet Friendly: $_petFriendly',
                style: const TextStyle(color: Colors.grey),
              ),
            ),
            const SizedBox(height: 24),

            // ── Submit ───────────────────────────────────────────────────────
            Center(
              child: ElevatedButton.icon(
                onPressed: _submitForm,
                icon: const Icon(Icons.hotel),
                label: const Text('Submit Selection'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 32,
                    vertical: 14,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}
