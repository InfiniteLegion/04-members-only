const showPassword = document.getElementById("show-password");
const inputPassword = document.getElementById("password");

showPassword.addEventListener("change", (e) => {
  e.target.checked
    ? (inputPassword.type = "text")
    : (inputPassword.type = "password");
});
