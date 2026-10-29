const showPassword = document.getElementById("show-password");
const inputPassword = document.getElementById("password");
const form = document.getElementById("sign-up-form");

const rules = {
  last_name: [
    [(v) => v.trim().length > 0, "Enter last name"],
    [(v) => v.trim().length <= 50, "Max length 50 characters"],
  ],
  first_name: [
    [(v) => v.trim().length > 0, "Enter first name"],
    [(v) => v.trim().length <= 50, "Max length 50 characters"],
  ],
  username: [
    [(v) => v.trim().length >= 2, "Minimum 2 characters"],
    [(v) => /^[a-zA-Z0-9_]+$/.test(v), "Only letters, numbers and _"],
  ],
  email: [
    [(v) => v.length > 0, "Enter email"],
    [(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Incorrect email"],
  ],
  password: [
    [(v) => v.length >= 8, "Minimum 8 characters"],
    [
      (v) => /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v),
      "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 digit",
    ],
  ],
};

const errorId = {
  last_name: "sign-up-last-name-error",
  first_name: "sign-up-first-name-error",
  username: "sign-up-username-error",
  email: "sign-up-email-error",
  password: "sign-up-password-error",
};

const validateField = (input) => {
  const fieldRules = rules[input.name];

  if (!fieldRules) {
    return true;
  }

  const errorEl = document.getElementById(errorId[input.name]);
  const failed = fieldRules.find(([check]) => !check(input.value));

  if (failed) {
    errorEl.textContent = failed[1];
    errorEl.classList.remove("hidden");
    input.setAttribute("aria-invalid", "true");
    return false;
  }

  errorEl.textContent = "";
  errorEl.classList.add("hidden");
  input.removeAttribute("aria-invalid");

  return true;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = [...form.querySelectorAll("input[name]")];
  const results = inputs.map(validateField);

  if (results.includes(false)) {
    inputs.find((i) => i.hasAttribute("aria-invalid"))?.focus();
    return;
  }

  form.submit();
});

showPassword.addEventListener("change", (e) => {
  e.target.checked
    ? (inputPassword.type = "text")
    : (inputPassword.type = "password");
});
