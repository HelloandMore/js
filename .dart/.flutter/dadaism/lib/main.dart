import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // TRY THIS: Try running your application with "flutter run". You'll see
        // the application has a purple toolbar. Then, without quitting the app,
        // try changing the seedColor in the colorScheme below to Colors.green
        // and then invoke "hot reload" (save your changes or press the "hot
        // reload" button in a Flutter-supported IDE, or press "r" if you used
        // the command line to start the app).
        //
        // Notice that the counter didn't reset back to zero; the application
        // state is not lost during the reload. To reset the state, use hot
        // restart instead.
        //
        // This works for code too, not just values: Most code changes can be
        // tested with just a hot reload.
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'Dadaista versek'),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.yellow,
        title: Text("Dadaista versek"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'CSENDESEN ALSZIK',
              style: Theme.of(
                context,
              ).textTheme.headlineLarge?.copyWith(fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              'áprilisi dadaista álmok',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontStyle: FontStyle.italic,
                color: Colors.grey[700],
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            const Text(
              '''Csendesen alszik a táj szendereg a csősz
egyedül csüngök egy reccsenő faágon
ha végtelen hegynek mész hát légy erős
mindenáron

mert te alattam leszel ha ott hörgök fenn
hol távoli a messzeség és megöl a szenny
s gomolyognak szépséghibás öröm-álmok
díszdobozba rejtem lelkem és csak várok
bármi-áron

csak nevessetek ti hegyek várva tűz magányra
én átjárok végre magamból önmagamba
akkor is ha minden rét és szikla látja
hogy csüngök egyedül egy reccsenő faágon
én kivárom

zuhogjon felfelé a messzeség vagy a menny
vagy ez a bolondos áprilisi éjszaka idebenn.''',
              style: TextStyle(fontSize: 16, height: 1.8),
            ),
            const SizedBox(height: 32),
            Text(
              'Pest - Buda, 2015. április 1-11.',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                fontStyle: FontStyle.italic,
                color: Colors.grey[600],
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Szerző: M. Laurens',
              style: Theme.of(
                context,
              ).textTheme.bodySmall?.copyWith(color: Colors.grey[600]),
            ),
            const SizedBox(height: 50),
            const Divider(thickness: 2),
            const SizedBox(height: 50),
            Text(
              'dadaisten',
              style: Theme.of(
                context,
              ).textTheme.headlineLarge?.copyWith(fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            const Text('''az isten
globál
golyóbis
t lóbál
elhittem
hogy él
golyó és kötél
mint sitten
nézni
hogyan tekézi
ka hideg
rácson
nincs átjárásom
és minek
hittem
hogy lóbál isten
bármit is
ha már
az ujja halál''', style: TextStyle(fontSize: 16, height: 1.8)),
            const SizedBox(height: 32),
            Text(
              'Szerző: Molnár Jolán',
              style: Theme.of(
                context,
              ).textTheme.bodySmall?.copyWith(color: Colors.grey[600]),
            ),
          ],
        ),
      ),
    );
  }
}
