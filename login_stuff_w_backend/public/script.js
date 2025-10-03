const authForm = document.getElementById("authForm");
const toggleForm = document.getElementById("toggleForm");
const errorMessage = document.getElementById("errorMessage");
const loginFields = document.getElementById("loginFields");
const registerFields = document.getElementById("registerFields");
const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");

let isLoginMode = true;

function setInputsDisabled(container, disabled) {
  container
    .querySelectorAll("input, textarea, select, button")
    .forEach((el) => {
      if (el.type === "submit") return;
      el.disabled = disabled;
    });
  container.setAttribute("aria-hidden", String(disabled));
}

function showMessage(message, isError = false) {
  errorMessage.textContent = message;
  errorMessage.style.color = isError ? "red" : "green";

  if (!isError) {
    setTimeout(() => {
      errorMessage.textContent = "";
    }, 3000);
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

setInputsDisabled(loginFields, false);
setInputsDisabled(registerFields, true);

toggleForm.addEventListener("click", () => {
  isLoginMode = !isLoginMode;

  if (isLoginMode) {
    loginFields.style.display = "block";
    registerFields.style.display = "none";
    formTitle.textContent = "Bejelentkezés";
    submitButton.textContent = "Bejelentkezés";
    toggleForm.textContent = "Regisztrálj itt!";
    setInputsDisabled(loginFields, false);
    setInputsDisabled(registerFields, true);
  } else {
    loginFields.style.display = "none";
    registerFields.style.display = "block";
    formTitle.textContent = "Regisztráció";
    submitButton.textContent = "Regisztráció";
    toggleForm.textContent = "Már van fiókod? Bejelentkezés!";
    setInputsDisabled(loginFields, true);
    setInputsDisabled(registerFields, false);
  }

  errorMessage.textContent = "";
  errorMessage.style.color = "red";
  const firstEnabled = isLoginMode
    ? loginFields.querySelector("input:not([disabled])")
    : registerFields.querySelector("input:not([disabled])");
  if (firstEnabled) firstEnabled.focus();
});

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMessage.textContent = "";

  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Feldolgozás...";

  try {
    if (isLoginMode) {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      if (!validateEmail(email)) {
        showMessage("Kérlek, adj meg egy érvényes email címet!", true);
        return;
      }
      if (!password) {
        showMessage("Kérlek, add meg a jelszót!", true);
        return;
      }

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        showMessage("Bejelentkezés sikeres!", false);
        authForm.reset();
        console.log("Logged in user:", data.user);
      } else {
        showMessage(data.message, true);
      }
    } else {
      const regEmail = document.getElementById("regEmail").value.trim();
      const regPassword = document.getElementById("regPassword").value;
      const regPasswordConfirm =
        document.getElementById("regPasswordConfirm").value;

      if (!validateEmail(regEmail)) {
        showMessage("Kérlek, adj meg egy érvényes email címet!", true);
        return;
      }
      if (!regPassword) {
        showMessage("Kérlek, adj meg egy jelszót!", true);
        return;
      }
      if (regPassword.length < 6) {
        showMessage(
          "A jelszónak legalább 6 karakter hosszúnak kell lennie!",
          true
        );
        return;
      }
      if (regPassword !== regPasswordConfirm) {
        showMessage("A jelszavak nem egyeznek!", true);
        return;
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: regEmail, password: regPassword }),
      });

      const data = await response.json();

      if (data.success) {
        showMessage(data.message, false);
        authForm.reset();

        setTimeout(() => {
          isLoginMode = true;
          loginFields.style.display = "block";
          registerFields.style.display = "none";
          formTitle.textContent = "Bejelentkezés";
          submitButton.textContent = "Bejelentkezés";
          toggleForm.textContent = "Regisztrálj itt!";
          setInputsDisabled(loginFields, false);
          setInputsDisabled(registerFields, true);
          document.getElementById("email").value = regEmail;
        }, 2000);
      } else {
        showMessage(data.message, true);
      }
    }
  } catch (error) {
    console.error("Network error:", error);
    showMessage(
      "Hálózati hiba történt! Ellenőrizd az internetkapcsolatot.",
      true
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
});
