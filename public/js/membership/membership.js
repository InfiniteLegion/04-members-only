require("dotenv").config();

const form = document.getElementById("member-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputPassword = document.getElementById("secret");
  const inputError = document.getElementById("secret-error");

  if (inputPassword.value.trim() === "") {
    inputError.classList.remove("hidden");
    inputError.textContent = "Enter secret password";
    return;
  } else {
    inputError.classList.add("hidden");
    inputError.textContent = "";
  }

  // form.submit();
});
