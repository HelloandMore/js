import 'dart:convert';
import 'package:flutter/material.dart';
import '../services/api_service.dart';

class InvitationsScreen extends StatefulWidget {
  const InvitationsScreen({super.key});

  @override
  State<InvitationsScreen> createState() => _InvitationsScreenState();
}

class _InvitationsScreenState extends State<InvitationsScreen> {
  List<dynamic> invites = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => loading = true);
    final resp = await api.get('/invitations');
    if (resp.statusCode == 200) {
      final data = jsonDecode(resp.body);
      invites = data['invitations'] ?? [];
    }
    setState(() => loading = false);
  }

  Future<void> _accept(int id) async {
    await api.post('/invitations/$id/accept', {});
    await _load();
  }

  Future<void> _decline(int id) async {
    await api.post('/invitations/$id/decline', {});
    await _load();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Meghívások')),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: invites.length,
              itemBuilder: (c, i) {
                final inv = invites[i];
                return ListTile(
                  title: Text(inv['team_name'] ?? 'Csapat'),
                  subtitle: Text('Feladó: ${inv['from_name'] ?? ''}'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      TextButton(
                        onPressed: () => _accept(inv['id']),
                        child: const Text('Elfogad'),
                      ),
                      TextButton(
                        onPressed: () => _decline(inv['id']),
                        child: const Text('Elutasít'),
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}
