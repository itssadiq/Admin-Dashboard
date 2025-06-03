import { fetchAdminCredentialsFromDB } from "../backend/database.js";

document.addEventListener("DOMContentLoaded", async () => {
  let admins;

  try {
    const data = await fetchAdminCredentialsFromDB();
    admins = data;
  } catch (error) {
    console.error("Error fetching data from database:", error.message);
  }

  const emailEl = document.getElementById("emailAddress");
  const passwordEl = document.getElementById("password");

  const signInButton = document.querySelector(".js-sign-in");
  signInButton.addEventListener("click", (event) => {
    event.preventDefault();

    const email = emailEl.value;
    const password = passwordEl.value;

    adminlogin(email, password);
  });

  function adminlogin(email, password) {
    let currentUser;

    if (email == "" || password == "") {
      alert("Inputs cannot be empty");
    } else {
      admins.forEach((admin) => {
        if (admin.email_address === email) {
          currentUser = admin;
        }
      });
    }

    if (currentUser.password === password) {
      window.location.href = "./dashboard.html";
    } else {
      alert("wrong password");
    }
  }
});
