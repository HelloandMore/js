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
// Enum for room type — used with Radio buttons
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
  // ── Navigation (mirrors example.dart) ────────────────────────────────────
  int _selectedIndex = 0;
  String _currentPage = 'amenities-form';
  final Map<int, String> _pages = {0: 'amenities-form', 1: 'manage-facilities'};

  void _onBottomNavBarTapped(int index) {
    setState(() {
      _selectedIndex = index;
      _currentPage = _pages[index]!;
    });
  }

  // ── Section 1: Room Type — Radio buttons ──────────────────────────────────
  RoomType _selectedRoomType = RoomType.single;

  // ── Section 2: Room Features — Checkboxes ────────────────────────────────
  bool _hasAirConditioning = false;
  bool _hasMiniBar = false;
  bool _hasSafe = false;
  bool _hasBalcony = false;

  // ── Section 3: Hotel Facilities — Dismissible CheckboxListTile list ───────
  final GlobalKey<FormState> _facilityFormKey = GlobalKey<FormState>();
  final TextEditingController _facilityController = TextEditingController();
  List<String> _facilities = [
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
  final List<String> _selectedFacilities = [];
  String _removedFacility = '';
  int _removedFacilityIndex = 0;

  @override
  void dispose() {
    _facilityController.dispose();
    super.dispose();
  }

  void _selectFacility(bool value, String facility) {
    setState(() {
      if (value) {
        _selectedFacilities.add(facility);
      } else {
        _selectedFacilities.remove(facility);
      }
    });
  }

  void _addFacility() {
    if (_facilityFormKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('${_facilityController.text.trim()} added'),
          showCloseIcon: true,
        ),
      );
      setState(() {
        _facilities.add(_facilityController.text.trim());
      });
      _facilityController.clear();
    }
  }

  void _removeFacility(int index) {
    _removedFacility = _facilities[index];
    _removedFacilityIndex = index;
    setState(() {
      _selectedFacilities.remove(_removedFacility);
      _facilities.removeAt(index);
    });
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$_removedFacility removed'),
        showCloseIcon: true,
        action: SnackBarAction(
          label: 'Undo',
          onPressed: () {
            setState(() {
              _facilities.insert(_removedFacilityIndex, _removedFacility);
            });
            _undoDialog(context);
          },
        ),
      ),
    );
  }

  void _undoDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Undo removal'),
          content: Text('$_removedFacility has been restored.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  // ── Section 4: Included Services — SwitchListTile map ────────────────────
  final Map<String, bool> _includedServices = <String, bool>{
    'Breakfast': false,
    'Wi-Fi': true,
    'Room Service': false,
    'Laundry': false,
    'Airport Transfer': false,
  };

  // ── Section 5: Special Requests — Form Switches ───────────────────────────
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

  // ── Page: Amenities Form ──────────────────────────────────────────────────
  Widget _buildAmenitiesForm() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. Room Type — Radio buttons
          _sectionHeader('Room Type'),
          ...RoomType.values.map(
            (type) => RadioListTile<RoomType>(
              title: Text(_roomTypeLabel(type)),
              value: type,
              groupValue: _selectedRoomType,
              onChanged: (RoomType? value) =>
                  setState(() => _selectedRoomType = value!),
            ),
          ),
          Text(
            'Selected: ${_roomTypeLabel(_selectedRoomType)}',
            style: const TextStyle(color: Colors.grey),
          ),
          const Divider(height: 30, thickness: 2),

          // 2. Room Features — Checkboxes
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

          // 3. Included Services — SwitchListTile map
          _sectionHeader('Included Services'),
          SizedBox(
            height: 270,
            child: ListView(
              children: _includedServices.keys.map((String key) {
                return SwitchListTile(
                  title: Text(key),
                  value: _includedServices[key]!,
                  onChanged: (bool value) =>
                      setState(() => _includedServices[key] = value),
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

          // 4. Special Requests — Form Switches
          _sectionHeader('Special Requests'),
          Form(
            child: Column(
              children: [
                SwitchListTile(
                  title: const Text('Early Check-in'),
                  value: _earlyCheckIn,
                  onChanged: (bool value) =>
                      setState(() => _earlyCheckIn = value),
                ),
                SwitchListTile(
                  title: const Text('Late Check-out'),
                  value: _lateCheckOut,
                  onChanged: (bool value) =>
                      setState(() => _lateCheckOut = value),
                ),
                SwitchListTile(
                  title: const Text('Pet Friendly Room'),
                  value: _petFriendly,
                  onChanged: (bool value) =>
                      setState(() => _petFriendly = value),
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

          // Submit
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
    );
  }

  // ── Page: Manage Facilities (add / remove / undo) ─────────────────────────
  Widget _buildManageFacilities() {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        children: [
          // Add facility form (mirrors example.dart add-todo form)
          Form(
            key: _facilityFormKey,
            child: Row(
              children: [
                Expanded(
                  child: TextFormField(
                    controller: _facilityController,
                    keyboardType: TextInputType.text,
                    decoration: const InputDecoration(
                      label: Text('New Facility'),
                    ),
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'Please enter a facility name';
                      }
                      if (_facilities.contains(value.trim())) {
                        return 'Facility already exists';
                      }
                      return null;
                    },
                    autofocus: true,
                  ),
                ),
                const SizedBox(width: 12),
                ElevatedButton.icon(
                  onPressed: _addFacility,
                  icon: const Icon(Icons.add),
                  label: const Text('Add'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          // Dismissible facility list (mirrors example.dart todo-list)
          Expanded(
            child: ListView.builder(
              itemCount: _facilities.length,
              itemBuilder: (BuildContext context, int index) => Dismissible(
                key: ValueKey(_facilities[index]),
                onDismissed: (direction) => _removeFacility(index),
                background: Container(
                  color: Colors.red,
                  alignment: Alignment.centerRight,
                  padding: const EdgeInsets.only(right: 20),
                  child: const Icon(Icons.delete, color: Colors.white),
                ),
                child: CheckboxListTile(
                  title: Text(_facilities[index]),
                  value: _selectedFacilities.contains(_facilities[index]),
                  onChanged: (bool? value) =>
                      _selectFacility(value!, _facilities[index]),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Text(
              'Selected: ${[..._selectedFacilities..sort()].isEmpty ? "None" : [..._selectedFacilities..sort()].join(", ")}',
              style: const TextStyle(color: Colors.grey),
            ),
          ),
        ],
      ),
    );
  }

  // ── Build ─────────────────────────────────────────────────────────────────
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // End drawer — mirrors example.dart
      endDrawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.primary,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Menu',
                    style: TextStyle(color: Colors.white, fontSize: 18),
                  ),
                  IconButton(
                    onPressed: () => Navigator.of(context).pop(),
                    icon: const Icon(Icons.close, color: Colors.white),
                  ),
                ],
              ),
            ),
            ListTile(
              leading: const Icon(Icons.hotel),
              title: const Text('Amenities Form'),
              onTap: () {
                setState(() {
                  _selectedIndex = 0;
                  _currentPage = 'amenities-form';
                });
                Navigator.of(context).pop();
              },
            ),
            ListTile(
              leading: const Icon(Icons.format_list_bulleted),
              title: const Text('Manage Facilities'),
              onTap: () {
                setState(() {
                  _selectedIndex = 1;
                  _currentPage = 'manage-facilities';
                });
                Navigator.of(context).pop();
              },
            ),
          ],
        ),
      ),
      // Bottom navigation bar — mirrors example.dart
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        backgroundColor: Theme.of(context).colorScheme.primary,
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.white60,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.hotel), label: 'Amenities'),
          BottomNavigationBarItem(
            icon: Icon(Icons.format_list_bulleted),
            label: 'Facilities',
          ),
        ],
        currentIndex: _selectedIndex,
        onTap: _onBottomNavBarTapped,
      ),
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Hotel Amenities Selection'),
      ),
      body: _currentPage == 'amenities-form'
          ? _buildAmenitiesForm()
          : _buildManageFacilities(),
    );
  }
}
