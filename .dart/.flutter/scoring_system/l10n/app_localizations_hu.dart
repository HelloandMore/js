// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Hungarian (`hu`).
class AppLocalizationsHu extends AppLocalizations {
  AppLocalizationsHu([String locale = 'hu']) : super(locale);

  @override
  String get appTitle => 'Pontozó rendszer';

  @override
  String get loginTitle => 'Bejelentkezés';

  @override
  String get email => 'Email';

  @override
  String get password => 'Jelszó';

  @override
  String get login => 'Bejelentkezés';

  @override
  String get teacherDashboard => 'Tanári felület';

  @override
  String get studentDashboard => 'Diák felület';

  @override
  String get teams => 'Csapatok';

  @override
  String get createTeam => 'Csapat létrehozása';

  @override
  String get teamName => 'Csapat neve';

  @override
  String get invite => 'Meghívás';

  @override
  String get accept => 'Elfogadás';

  @override
  String get decline => 'Elutasítás';

  @override
  String get score => 'Pontszám';

  @override
  String get addScore => 'Pont hozzáadása';

  @override
  String get setScore => 'Pont beállítása';

  @override
  String get invitations => 'Meghívások';

  @override
  String get newTeam => 'Új csapat';

  @override
  String get cancel => 'Mégse';

  @override
  String get create => 'Létrehozás';

  @override
  String get save => 'Mentés';

  @override
  String invitationFrom(Object from) {
    return 'Feladó: $from';
  }

  @override
  String get scoreHistory => 'Ponttörténet';

  @override
  String get members => 'Tagok';
}
