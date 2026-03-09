const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

const correctUsername = "admin";
const correctPassword = "admin123";

loginForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const enteredUsername = usernameInput.value.trim();
  const enteredPassword = passwordInput.value.trim();

  if (
    enteredUsername === correctUsername &&
    enteredPassword === correctPassword
  ) {
    window.location.href = "main.html";
  } else {
    errorMessage.classList.remove("hidden");
    usernameInput.value = "";
    passwordInput.value = "";
  }
});
