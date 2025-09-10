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
  const firstEnabled = isLoginMode
    ? loginFields.querySelector("input:not([disabled])")
    : registerFields.querySelector("input:not([disabled])");
  if (firstEnabled) firstEnabled.focus();
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  errorMessage.textContent = "";

  if (isLoginMode) {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!validateEmail(email)) {
      errorMessage.textContent = "Kérlek, adj meg egy érvényes email címet!";
      return;
    }
    if (!password) {
      errorMessage.textContent = "Kérlek, add meg a jelszót!";
      return;
    }

    alert("Bejelentkezés sikeres!");
    authForm.reset();
  } else {
    const regEmail = document.getElementById("regEmail").value.trim();
    const regPassword = document.getElementById("regPassword").value;
    const regPasswordConfirm =
      document.getElementById("regPasswordConfirm").value;

    if (!validateEmail(regEmail)) {
      errorMessage.textContent = "Kérlek, adj meg egy érvényes email címet!";
      return;
    }
    if (!regPassword) {
      errorMessage.textContent = "Kérlek, adj meg egy jelszót!";
      return;
    }
    if (regPassword !== regPasswordConfirm) {
      errorMessage.textContent = "A jelszavak nem egyeznek!";
      return;
    }

    alert("Regisztráció sikeres!");
    authForm.reset();

    isLoginMode = true;
    loginFields.style.display = "block";
    registerFields.style.display = "none";
    formTitle.textContent = "Bejelentkezés";
    submitButton.textContent = "Bejelentkezés";
    toggleForm.textContent = "Regisztrálj itt!";
    setInputsDisabled(loginFields, false);
    setInputsDisabled(registerFields, true);
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
