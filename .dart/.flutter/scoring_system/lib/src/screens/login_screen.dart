import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../localization/strings.dart';
import '../../main.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _loading = false;

  @override
  Widget build(BuildContext context) {
    // Don't capture BuildContext across async gaps; obtain provider when needed.
    return Scaffold(
      appBar: AppBar(title: Text(Strings.hu['loginTitle']!)),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _email,
              decoration: InputDecoration(labelText: Strings.hu['email']),
            ),
            TextField(
              controller: _password,
              decoration: InputDecoration(labelText: Strings.hu['password']),
              obscureText: true,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _loading
                  ? null
                  : () async {
                      setState(() => _loading = true);
                      final auth = Provider.of<AuthProvider>(
                        context,
                        listen: false,
                      );
                      final ok = await auth.login(
                        _email.text.trim(),
                        _password.text.trim(),
                      );
                      if (!mounted) return;
                      setState(() => _loading = false);
                      if (!ok) {
                        scaffoldMessengerKey.currentState?.showSnackBar(
                          const SnackBar(
                            content: Text('Bejelentkezés sikertelen'),
                          ),
                        );
                      }
                    },
              child: Text(Strings.hu['login']!),
            ),
          ],
        ),
      ),
    );
  }
}
