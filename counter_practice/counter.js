const decreaseButton = document.getElementById("decrease");
const decreaseBy10Button = document.getElementById("decreaseBy10");
const countSpan = document.getElementById("count");
const increaseButton = document.getElementById("increase");
const increaseBy10Button = document.getElementById("increaseBy10");

let count = 0;

decreaseButton.addEventListener("click", () => {
    count--;
    updateCount();
});

decreaseBy10Button.addEventListener("click", () => {
    count -= 10;
    updateCount();
});

increaseButton.addEventListener("click", () => {
    count++;
    updateCount();
});

increaseBy10Button.addEventListener("click", () => {
    count += 10;
    updateCount();
});

function updateCount() {
    countSpan.textContent = count;
}