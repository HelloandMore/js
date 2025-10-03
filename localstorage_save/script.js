const form = document.getElementById("dataForm");
const storedDataDiv = document.getElementById("storedData");
const clearButton = document.getElementById("clearStorage");

clearButton.addEventListener("click", function () {
  localStorage.getItem("userData")
    ? (localStorage.clear("userData"), alert("Az adatok sikeresen törölve."))
    : alert("Nincs mit törölni.");
  displayData();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const postalCode = document.getElementById("postalCode").value;
  const street = document.getElementById("street").value;
  const houseNumber = document.getElementById("houseNumber").value;

  const userData = { name, city, postalCode, street, houseNumber };
  localStorage.setItem("userData", JSON.stringify(userData));
  alert("Az adatok elmentve.");
  document.getElementById("name").value = "";
  document.getElementById("city").value = "";
  document.getElementById("postalCode").value = "";
  document.getElementById("street").value = "";
  document.getElementById("houseNumber").value = "";
  displayData();
});

function displayData() {
  const data = localStorage.getItem("userData");
  if (data) {
    const userData = JSON.parse(data);
    storedDataDiv.innerHTML = `
                <h2>Mentett adatok:</h2>
                <p>Név: ${userData.name || "Nincs adat"}</p>
                <p>Település: ${userData.city || "Nincs adat"}</p>
                <p>Irányítószám: ${userData.postalCode || "Nincs adat"}</p>
                <p>Közterület: ${userData.street || "Nincs adat"}</p>
                <p>Házszám: ${userData.houseNumber || "Nincs adat"}</p>
            `;
  } else {
    storedDataDiv.innerHTML = "<p>Nincs adat.</p>";
  }
}

window.onload = displayData;
