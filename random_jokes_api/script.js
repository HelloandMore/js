document.addEventListener("DOMContentLoaded", () => {
  const jokeContainer = document.getElementById("joke-display");
  const fetchButton = document.getElementById("get-joke-type");
  const jokeTypeSelect = document.getElementById("joke-type");
  const jokeIdInput = document.getElementById("joke-id");
  const clearButton = document.getElementById("clear-button");

  const fetchRandomJoke = () => {
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then((response) => response.json())
      .then((data) => displayJoke(data))
      .catch((error) => console.error("Error fetching random joke:", error));
  };

  const fetchTenJokes = () => {
    fetch("https://official-joke-api.appspot.com/jokes/ten")
      .then((response) => response.json())
      .then((data) => {
        jokeContainer.innerHTML = "";
        data.forEach((joke) => displayJoke(joke));
      })
      .catch((error) => console.error("Error fetching ten jokes:", error));
  };

  const fetchJokeById = (id) => {
    fetch(`https://official-joke-api.appspot.com/jokes/${id}`)
      .then((response) => response.json())
      .then((data) => displayJoke(data))
      .catch((error) => console.error("Error fetching joke by ID:", error));
  };

  const fetchJokeByType = (type) => {
    fetch(`https://official-joke-api.appspot.com/jokes/${type}/random`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          displayJoke(data[0]); // Use the first joke in the array
        } else {
          console.error("No jokes found for the selected type.");
        }
      })
      .catch((error) => console.error("Error fetching joke by type:", error));
  };

  const displayJoke = (joke) => {
    const jokeElement = document.createElement("div");
    jokeElement.className = "joke";
    jokeElement.innerHTML = `<p>${joke.setup}</p><p>${joke.punchline}</p>`;
    jokeContainer.appendChild(jokeElement);
  };

  fetchButton.addEventListener("click", () => {
    const selectedType = jokeTypeSelect.value;
    const jokeId = jokeIdInput.value;

    if (selectedType === "random") {
      fetchRandomJoke();
    } else if (selectedType === "ten") {
      fetchTenJokes();
    } else if (selectedType === "id" && jokeId) {
      fetchJokeById(jokeId);
    } else if (selectedType !== "id") {
      fetchJokeByType(selectedType);
    }
  });

  // Add a button to clear jokes
  clearButton.addEventListener("click", () => {
    jokeContainer.innerHTML = "";
  });
  // Add event listeners for the other buttons
  document
    .getElementById("random-joke")
    .addEventListener("click", fetchRandomJoke);
  document.getElementById("ten-jokes").addEventListener("click", fetchTenJokes);
  document.getElementById("get-joke-id").addEventListener("click", () => {
    const jokeId = jokeIdInput.value;
    if (jokeId) {
      fetchJokeById(jokeId);
    }
  });
});
