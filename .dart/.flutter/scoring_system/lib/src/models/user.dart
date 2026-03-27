class User {
  final int id;
  final String name;
  final String email;
  final String role;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
  });

  factory User.fromJson(Map<String, dynamic> j) =>
      User(id: j['id'], name: j['name'], email: j['email'], role: j['role']);
}
