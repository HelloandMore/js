import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/team.dart';
import '../localization/strings.dart';
import '../services/api_service.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class TeamDetail extends StatefulWidget {
  final Team team;
  const TeamDetail({super.key, required this.team});

  @override
  State<TeamDetail> createState() => _TeamDetailState();
}

class _TeamDetailState extends State<TeamDetail> {
  List members = [];
  List history = [];
  double total = 0;
  bool loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => loading = true);
    final teamResp = await api.get('/teams/${widget.team.id}');
    if (teamResp.statusCode == 200) {
      final data = jsonDecode(teamResp.body);
      members = data['members'] ?? [];
    }
    final scoreResp = await api.get('/scores/teams/${widget.team.id}/scores');
    if (scoreResp.statusCode == 200) {
      final sdata = jsonDecode(scoreResp.body);
      history = sdata['history'] ?? [];
      total = (sdata['total'] ?? 0).toDouble();
    }
    setState(() => loading = false);
  }

  Future<void> _addScore() async {
    final ctl = TextEditingController();
    final res = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Pont hozzáadása'),
        content: TextField(
          controller: ctl,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(labelText: 'Érték (pl. 5 vagy -2)'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Mégse'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Mentés'),
          ),
        ],
      ),
    );
    if (res == true) {
      final v = double.tryParse(ctl.text.trim());
      if (v != null) {
        await api.post('/scores/teams/${widget.team.id}/scores', {
          'value': v,
          'reason': 'Manual',
        });
        await _load();
      }
    }
  }

  Future<void> _setScore() async {
    final ctl = TextEditingController();
    final res = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Pont beállítása (abszolút)'),
        content: TextField(
          controller: ctl,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(labelText: 'Új összesített pont'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Mégse'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Mentés'),
          ),
        ],
      ),
    );
    if (res == true) {
      final v = double.tryParse(ctl.text.trim());
      if (v != null) {
        await api.post('/scores/teams/${widget.team.id}/scores', {
          'value': v - total,
          'reason': 'Set absolute',
        });
        await _load();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    return Scaffold(
      appBar: AppBar(title: Text(widget.team.name)),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${Strings.hu['teamName']}: ${widget.team.name}',
                    style: const TextStyle(fontSize: 18),
                  ),
                  const SizedBox(height: 8),
                  Text('${Strings.hu['score']}: ${total.toStringAsFixed(1)}'),
                  const SizedBox(height: 12),
                  Text(
                    'Tagok:',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  ...members.map(
                    (m) => ListTile(
                      title: Text(m['name']),
                      subtitle: Text(m['email']),
                    ),
                  ),
                  const SizedBox(height: 12),
                  if (auth.user?.role == 'teacher') ...[
                    ElevatedButton(
                      onPressed: _addScore,
                      child: Text(Strings.hu['addScore']!),
                    ),
                    const SizedBox(height: 8),
                    ElevatedButton(
                      onPressed: _setScore,
                      child: Text(Strings.hu['setScore']!),
                    ),
                  ],
                  const SizedBox(height: 12),
                  Text(
                    'Ponttörténet:',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  ...history.map(
                    (h) => ListTile(
                      title: Text('${h['value']}'),
                      subtitle: Text(h['reason'] ?? ''),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
