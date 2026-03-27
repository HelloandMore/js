class Team {
  final int id;
  final String name;

  Team({required this.id, required this.name});

  factory Team.fromJson(Map<String, dynamic> j) =>
      Team(id: j['id'], name: j['name']);
}
