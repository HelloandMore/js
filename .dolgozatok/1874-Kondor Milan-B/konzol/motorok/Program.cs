// See https://aka.ms/new-console-template for more information
/* 
*/

var fileData = await File.ReadAllLinesAsync("motoros_utak.csv", Encoding.UTF8);
var motors = new List<Motor>();
foreach (var line in fileData)
{
    if (line == fileData[0]) continue;
    var data = line.Split(';');
    motors.Add(new Motor
    {
        From = data[0],
        To = data[1],
        Distance = int.Parse(data[2]),
        StartedAt = DateTime.Parse(data[3]),
        EndedAt = DateTime.Parse(data[4])
    });
}

// 2. feladat - Összes út száma
Console.WriteLine($"2. feladat: Összes út száma: {motors.Count}\n");

// 3. feladat - Leghosszabb út távolság alapján
var longestDistance = motors.OrderByDescending(m => m.Distance).FirstOrDefault();
Console.WriteLine($"3. feladat: {longestDistance.From} -> {longestDistance.To}: {longestDistance.Distance} km\n");

// 4. feladat - Utazás hossza napokban
var allJourneys = motors.OrderByDescending(m => (m.EndedAt - m.StartedAt).TotalDays);
Console.WriteLine("4. feladat: ");
foreach (var j in allJourneys)
{
    if ((j.EndedAt - j.StartedAt).TotalDays > 0)
    {
        Console.WriteLine($"\t{j.From} -> {j.To}: {(j.EndedAt - j.StartedAt).TotalDays + 1} nap");
    }
}

// 5. feladat - átlagos napi megtett távolság: azoknál az utaknál, amelyek legalább 2 naposak, számítsa ki mennyi az átlagos napi megtett távolság
//var averageDistance = motors.Where(m => (m.EndedAt - m.StartedAt).TotalDays >= 1)
//    .Average(m => m.Distance / (m.EndedAt - m.StartedAt).TotalDays);
Console.WriteLine("\n5. feladat: ");
foreach (var j in allJourneys)
{
    if ((j.EndedAt - j.StartedAt).TotalDays >= 1)
    {
        var averageDistance = j.Distance / ((j.EndedAt - j.StartedAt).TotalDays + 1);
        Console.WriteLine($"\t{j.From} -> {j.To} ({(j.EndedAt - j.StartedAt).TotalDays + 1} nap): {averageDistance:F2} km/nap");
    }
}

Console.WriteLine("\n");

// 6. feladat - Városonkénti indulások száma: határozd meg, hogy meg városokból hányszor indult motoros út
var cityStarts = motors.GroupBy(m => m.From).Select(g => new { City = g.Key, Count = g.Count() }).OrderByDescending(x => x.Count);
Console.WriteLine("6. feladat: ");
foreach (var city in cityStarts)
{
    Console.WriteLine($"{city.City} - {city.Count}");
}

// 7. feladat - Melyik hónapban történt a legtöbb utazás kezdete
var mostCommonMonths = motors.GroupBy(m => m.StartedAt.Month).Select(g => new { Month = g.Key, Count = g.Count() }).OrderByDescending(x => x.Count);
Console.WriteLine("\n7. feladat: ");
foreach (var month in mostCommonMonths)
{
    Console.WriteLine($"{month.Month}. hónap - {month.Count} indulás");
}