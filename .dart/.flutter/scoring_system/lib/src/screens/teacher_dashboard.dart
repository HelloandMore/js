import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../localization/strings.dart';
import '../services/api_service.dart';
import '../models/team.dart';
import 'team_detail.dart';

class TeacherDashboard extends StatefulWidget {
  const TeacherDashboard({super.key});

  @override
  State<TeacherDashboard> createState() => _TeacherDashboardState();
}

class _TeacherDashboardState extends State<TeacherDashboard> {
  List<Team> _teams = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadTeams();
  }

  Future<void> _loadTeams() async {
    setState(() => _loading = true);
    final resp = await api.get('/teams');
    if (resp.statusCode == 200) {
      final data = await Future.value(resp.body);
      final parsed = (jsonDecode(data) as Map)['teams'] as List;
      setState(() => _teams = parsed.map((e) => Team.fromJson(e)).toList());
    }
    setState(() => _loading = false);
  }

  Future<void> _createTeam() async {
    final nameCtl = TextEditingController();
    final res = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Új csapat'),
        content: TextField(
          controller: nameCtl,
          decoration: const InputDecoration(labelText: 'Név'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Mégse'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Létrehozás'),
          ),
        ],
      ),
    );
    if (res == true && nameCtl.text.trim().isNotEmpty) {
      await api.post('/teams', {'name': nameCtl.text.trim()});
      await _loadTeams();
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    return Scaffold(
      appBar: AppBar(
        title: Text(Strings.hu['teacherDashboard']!),
        actions: [
          IconButton(
            onPressed: () => auth.logout(),
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _teams.length,
              itemBuilder: (context, i) {
                final t = _teams[i];
                return ListTile(
                  title: Text(t.name),
                  onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => TeamDetail(team: t)),
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: _createTeam,
        child: const Icon(Icons.add),
      ),
    );
  }
}
