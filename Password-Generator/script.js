document.addEventListener("DOMContentLoaded", function () {
  const lengthInput = document.getElementById("length");
  const generateBtn = document.getElementById("generateBtn");
  const passwordInput = document.getElementById("password");
  const copyBtn = document.getElementById("copyBtn");

  generateBtn.addEventListener("click", generatePassword);
  copyBtn.addEventListener("click", copyPassword);

  function generatePassword() {
    const length = parseInt(lengthInput.value);
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    passwordInput.value = password;
  }

  function copyPassword() {
    passwordInput.select();
    document.execCommand("copy");
  }
});
