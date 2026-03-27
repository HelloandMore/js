import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Use 10.0.2.2 for Android emulator to reach host machine. Change if needed.
  static const String baseUrl = 'http://10.0.2.2:3000';

  String? _token;

  void setToken(String? token) => _token = token;

  Future<http.Response> post(String path, Map body) {
    final uri = Uri.parse('$baseUrl$path');
    return http.post(uri, headers: _headers(), body: jsonEncode(body));
  }

  Future<http.Response> get(String path) {
    final uri = Uri.parse('$baseUrl$path');
    return http.get(uri, headers: _headers());
  }

  Map<String, String> _headers() => {
    'Content-Type': 'application/json',
    if (_token != null) 'Authorization': 'Bearer $_token',
  };
}

final api = ApiService();
