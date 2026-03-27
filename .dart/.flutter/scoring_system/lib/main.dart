import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'src/providers/auth_provider.dart';
import 'src/screens/login_screen.dart';
import 'src/screens/teacher_dashboard.dart';
import 'src/screens/student_dashboard.dart';
// localization strings are used in screens

void main() {
  runApp(const MyApp());
}

final scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => AuthProvider())],
      child: MaterialApp(
        title: 'Scoring System',
        theme: ThemeData(primarySwatch: Colors.blue),
        scaffoldMessengerKey: scaffoldMessengerKey,
        localizationsDelegates: const [
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate,
          GlobalCupertinoLocalizations.delegate,
        ],
        supportedLocales: const [Locale('hu')],
        home: const RootRouter(),
        routes: {
          '/login': (_) => const LoginScreen(),
          '/teacher': (_) => const TeacherDashboard(),
          '/student': (_) => const StudentDashboard(),
        },
      ),
    );
  }
}

class RootRouter extends StatelessWidget {
  const RootRouter({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    if (!auth.initialized) {
      auth.init();
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (!auth.isAuthenticated) return const LoginScreen();
    if (auth.user?.role == 'teacher') return const TeacherDashboard();
    return const StudentDashboard();
  }
}
