import {
  fetchAdminCredentialsFromDB,
  deleteAdminFromDB,
  addAdminToDB,
} from "../backend/database.js";

import { getAdmin, showSettings } from "./showSettings.js";

const admin = getAdmin();
showSettings(admin);

document.addEventListener("DOMContentLoaded", async () => {
  const admins = await fetchAdminCredentialsFromDB();

  let tableHTML = `
    <tr>
        <td class="general">Name</td>
        <td class="general">Designation</td>
        <td class="general">Email Address</td>
        <td></td>
    </tr>
  `;

  admins.forEach((admin, index) => {
    const html = `
          <tr>
            <td class="general">${admin.full_name}</td>
            <td class="name-status">${admin.designation}</td>
            <td class="general">${admin.email_address}</td>
            <td>
                <button class="delete-button" data-index = "${index}">Delete</button>
            </td>
          </tr>
    `;

    tableHTML += html;
  });

  document.querySelector("table").innerHTML = tableHTML;

  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach((button) => {
    if (button.dataset.index == "0") {
      button.style.display = "none";
    }
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      const id = admins[index].id;

      deleteAdminFromDB(id);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  });

  document.querySelector(".add-new").addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".form").style.display = "block";
  });
  document.querySelector(".back-button").addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".form").style.display = "none";
  });

  const fullNameEl = document.getElementById("fullName");
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const designationEl = document.getElementById("designation");

  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const full_name = fullNameEl.value;
    const email_address = emailEl.value;
    const password = passwordEl.value;
    const designation = designationEl.value;

    addAdminToDB(full_name, email_address, password, designation);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  });
});
