const buttonIds = [
  "random-joke",
  "ten-jokes",
  "get-joke-type",
  "get-joke-id",
  "clear-button",
];

function setButtonsDisabled(disabled, ids = buttonIds) {
  ids.forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.disabled = disabled;
    btn.setAttribute("aria-disabled", String(disabled));
    btn.classList.toggle("is-disabled", disabled);
  });
}

const display = document.getElementById("joke-display");
const idInput = document.getElementById("joke-id");
const typeSelect = document.getElementById("joke-type");

async function fetchRandomJoke() {
  setButtonsDisabled(true);
  display.textContent = "Betöltés…";
  try {
    const res = await fetch(
      "https://official-joke-api.appspot.com/jokes/random"
    );
    if (!res.ok) throw new Error("HTTP " + res.status);
    const j = await res.json();
    display.innerHTML = `<div class="joke"><p>${j.setup}</p><p>${j.punchline}</p></div>`;
  } catch (e) {
    console.error(e);
    display.textContent = "Hiba történt.";
  } finally {
    setButtonsDisabled(false);
  }
}

async function fetchTenJokes() {
  setButtonsDisabled(true);
  display.textContent = "Betöltés…";
  try {
    const res = await fetch("https://official-joke-api.appspot.com/jokes/ten");
    const arr = await res.json();
    display.innerHTML = arr
      .map(
        (j) => `<div class="joke"><p>${j.setup}</p><p>${j.punchline}</p></div>`
      )
      .join("");
  } catch (e) {
    console.error(e);
    display.textContent = "Hiba történt.";
  } finally {
    setButtonsDisabled(false);
  }
}

async function fetchJokeById(id) {
  if (!id) {
    display.textContent = "Adj meg egy ID-t.";
    return;
  }
  setButtonsDisabled(true);
  display.textContent = "Betöltés…";
  try {
    const res = await fetch(
      `https://official-joke-api.appspot.com/jokes/${encodeURIComponent(id)}`
    );
    if (!res.ok) {
      display.textContent =
        res.status === 404 ? "Nem található." : "Hiba: " + res.status;
      return;
    }
    const j = await res.json();
    display.innerHTML = `<div class="joke"><p>${j.setup}</p><p>${j.punchline}</p></div>`;
  } catch (e) {
    console.error(e);
    display.textContent = "Hiba történt.";
  } finally {
    setButtonsDisabled(false);
  }
}

document
  .getElementById("random-joke")
  .addEventListener("click", fetchRandomJoke);
document.getElementById("ten-jokes").addEventListener("click", fetchTenJokes);
document
  .getElementById("get-joke-id")
  .addEventListener("click", () => fetchJokeById(idInput.value));
document.getElementById("get-joke-type").addEventListener("click", () => {
  const type = typeSelect.value;
  setButtonsDisabled(true);
  display.textContent = "Betöltés…";
  fetch(
    `https://official-joke-api.appspot.com/jokes/${encodeURIComponent(
      type
    )}/random`
  )
    .then((r) => r.json())
    .then((data) => {
      const j = Array.isArray(data) ? data[0] : data;
      display.innerHTML = `<div class="joke"><p>${j.setup}</p><p>${j.punchline}</p></div>`;
    })
    .catch((err) => {
      console.error(err);
      display.textContent = "Hiba történt.";
    })
    .finally(() => setButtonsDisabled(false));
});

// Clear
document.getElementById("clear-button").addEventListener("click", () => {
  display.innerHTML = '<div class="notice">Nincs vicc. Kérj egyet!</div>';
});
