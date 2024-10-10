// Mindegyik feladatot függvénnyel old meg!

// 1. getOtosLotteryNumbers - Ötöslottó számokat generál le véletlenszerűen, melyeket egy tömbben ad vissza.
function getOtosLotteryNumbers() {
    var numbers = [];
    for (var i = 0; i < 5; i++) {
        var randomNumber = Math.floor(Math.random() * 90) + 1;
        numbers.push(randomNumber);
    }
    return numbers;
}

// 2. getSortedtLotteryNumbers - paraméterrként kapott tömböt növekvő sorrendbe rendezi, a rendezett tömböt visszaadja
function getSortedtLotteryNumbers(numbers) {
    return numbers.sort(function(a, b) {
        return a - b;
    });
}

// 3. getNumberOfHits - két paramétert kap, egy tömböt lottószámokkal és egy tömböt a tippekkel. Visszaadja, hogy a tippekből ány egyezett meg a lottószámokkal
function getNumberOfHits(lottoNumbers, guesses) {
    var hits = 0;
    for (var i = 0; i < guesses.length; i++) {
        if (lottoNumbers.includes(guesses[i])) {
            hits++;
        }
    }
    return hits;
}

// 4. getMonthlyLotteryArrayNumbers - négy hét lottószámait adja vissza egy tömbben, mely a heti lottószámok tömbjét tartalmazza (meghívja a getOtosLotteryNumbers függvényt)
function getMonthlyLotteryArrayNumbers() {
    var monthlyNumbers = [];
    for (var i = 0; i < 4; i++) {
        var weeklyNumbers = getOtosLotteryNumbers();
        monthlyNumbers.push(weeklyNumbers);
    }
    return monthlyNumbers;
}

// 5. getUniqueNumbers - paraméterként kapja a négy hét lottószámainak tömbjét és visszaadja, hogy a hónapban mely számokat húzták ki. A viszatérő listában, minden szám csak egyszer szerepelhet.
function getUniqueNumbers(numbersArray) {
    var uniqueNumbers = [];
    for (var i = 0; i < numbersArray.length; i++) {
        for (var j = 0; j < numbersArray[i].length; j++) {
            if (!uniqueNumbers.includes(numbersArray[i][j])) {
                uniqueNumbers.push(numbersArray[i][j]);
            }
        }
    }
    return uniqueNumbers;
}

// 6. monthlyStatistics - paranéterként kapha a havi lottószámok tömbjét. Egy tömböt ad vissza, melynek elemei tömbök, melyben az első elem a lottószám, a második eleme, hogy a hónapban a számot hányszor húzták ki.
function monthlyStatistics(monthlyNumbers) {
    var statistics = [];
    var uniqueNumbers = getUniqueNumbers(monthlyNumbers);
    for (var i = 0; i < uniqueNumbers.length; i++) {
        var number = uniqueNumbers[i];
        var count = 0;
        for (var j = 0; j < monthlyNumbers.length; j++) {
            if (monthlyNumbers[j].includes(number)) {
                count++;
            }
        }
        statistics.push([number, count]);
    }
    return statistics;
}

var otosLotteryNumbers = getOtosLotteryNumbers();
console.log("Ötöslottó számok:", otosLotteryNumbers);

var sortedLotteryNumbers = getSortedtLotteryNumbers(otosLotteryNumbers);
console.log("Rendezett számok:", sortedLotteryNumbers);

var guesses = [1, 2, 3, 4, 5];
var numberOfHits = getNumberOfHits(otosLotteryNumbers, guesses);
console.log("Egyezések száma:", numberOfHits);

var monthlyNumbers = getMonthlyLotteryArrayNumbers();
console.log("Havi lottószámok:", monthlyNumbers);

var uniqueNumbers = getUniqueNumbers(monthlyNumbers);
console.log("Egyedi számok:", uniqueNumbers);

var statistics = monthlyStatistics(monthlyNumbers);
console.log("Havi statisztika:", statistics);