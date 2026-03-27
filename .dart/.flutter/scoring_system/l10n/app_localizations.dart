import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_hu.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[Locale('hu')];

  /// No description provided for @appTitle.
  ///
  /// In hu, this message translates to:
  /// **'Pontozó rendszer'**
  String get appTitle;

  /// No description provided for @loginTitle.
  ///
  /// In hu, this message translates to:
  /// **'Bejelentkezés'**
  String get loginTitle;

  /// No description provided for @email.
  ///
  /// In hu, this message translates to:
  /// **'Email'**
  String get email;

  /// No description provided for @password.
  ///
  /// In hu, this message translates to:
  /// **'Jelszó'**
  String get password;

  /// No description provided for @login.
  ///
  /// In hu, this message translates to:
  /// **'Bejelentkezés'**
  String get login;

  /// No description provided for @teacherDashboard.
  ///
  /// In hu, this message translates to:
  /// **'Tanári felület'**
  String get teacherDashboard;

  /// No description provided for @studentDashboard.
  ///
  /// In hu, this message translates to:
  /// **'Diák felület'**
  String get studentDashboard;

  /// No description provided for @teams.
  ///
  /// In hu, this message translates to:
  /// **'Csapatok'**
  String get teams;

  /// No description provided for @createTeam.
  ///
  /// In hu, this message translates to:
  /// **'Csapat létrehozása'**
  String get createTeam;

  /// No description provided for @teamName.
  ///
  /// In hu, this message translates to:
  /// **'Csapat neve'**
  String get teamName;

  /// No description provided for @invite.
  ///
  /// In hu, this message translates to:
  /// **'Meghívás'**
  String get invite;

  /// No description provided for @accept.
  ///
  /// In hu, this message translates to:
  /// **'Elfogadás'**
  String get accept;

  /// No description provided for @decline.
  ///
  /// In hu, this message translates to:
  /// **'Elutasítás'**
  String get decline;

  /// No description provided for @score.
  ///
  /// In hu, this message translates to:
  /// **'Pontszám'**
  String get score;

  /// No description provided for @addScore.
  ///
  /// In hu, this message translates to:
  /// **'Pont hozzáadása'**
  String get addScore;

  /// No description provided for @setScore.
  ///
  /// In hu, this message translates to:
  /// **'Pont beállítása'**
  String get setScore;

  /// No description provided for @invitations.
  ///
  /// In hu, this message translates to:
  /// **'Meghívások'**
  String get invitations;

  /// No description provided for @newTeam.
  ///
  /// In hu, this message translates to:
  /// **'Új csapat'**
  String get newTeam;

  /// No description provided for @cancel.
  ///
  /// In hu, this message translates to:
  /// **'Mégse'**
  String get cancel;

  /// No description provided for @create.
  ///
  /// In hu, this message translates to:
  /// **'Létrehozás'**
  String get create;

  /// No description provided for @save.
  ///
  /// In hu, this message translates to:
  /// **'Mentés'**
  String get save;

  /// No description provided for @invitationFrom.
  ///
  /// In hu, this message translates to:
  /// **'Feladó: {from}'**
  String invitationFrom(Object from);

  /// No description provided for @scoreHistory.
  ///
  /// In hu, this message translates to:
  /// **'Ponttörténet'**
  String get scoreHistory;

  /// No description provided for @members.
  ///
  /// In hu, this message translates to:
  /// **'Tagok'**
  String get members;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['hu'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'hu':
      return AppLocalizationsHu();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
