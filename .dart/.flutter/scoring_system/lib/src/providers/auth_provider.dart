import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_service.dart';
import '../models/user.dart';

class AuthProvider extends ChangeNotifier {
  User? user;
  String? token;
  bool initialized = false;

  bool get isAuthenticated => token != null && user != null;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    final t = prefs.getString('auth_token');
    if (t != null) {
      token = t;
      api.setToken(token);
      // attempt to fetch /auth/me
      final resp = await api.get('/auth/me');
      if (resp.statusCode == 200) {
        final data = jsonDecode(resp.body);
        user = data['user'] != null ? User.fromJson(data['user']) : null;
      }
    }
    initialized = true;
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    final resp = await api.post('/auth/login', {
      'email': email,
      'password': password,
    });
    if (resp.statusCode == 200) {
      final data = jsonDecode(resp.body);
      token = data['token'];
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('auth_token', token!);
      api.setToken(token);
      user = User.fromJson(data['user']);
      notifyListeners();
      return true;
    }
    return false;
  }

  void logout() {
    token = null;
    user = null;
    api.setToken(null);
    SharedPreferences.getInstance().then((p) => p.remove('auth_token'));
    notifyListeners();
  }
}
