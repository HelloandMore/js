function timeConvert(minutes) {
    if (minutes <= 0) {
        return "00:00";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = remainingMinutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
}

console.log(timeConvert(78)); // Output: 01:18
console.log(timeConvert(0)); // Output: 00:00
console.log(timeConvert(120)); // Output: 02:00
console.log(timeConvert(59)); // Output: 00:59