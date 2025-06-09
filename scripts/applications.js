import { fetchApplicationsDetailsFromDB } from "../backend/database.js";

document.addEventListener("DOMContentLoaded", async () => {
  let applications;
  try {
    const data = await fetchApplicationsDetailsFromDB();
    applications = data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  let tableHTML = "";
  applications.forEach((application) => {
    console.log(application);

    const html = `
            <tr>
              <td>${application.id}</td>
              <td>
                <p>${application.full_name}</p>
                <p>${application.email}</p>
              </td>
              <td>${application.program_1}</td>
              <td>${application.program_2}</td>
              <td>08-06-2025</td>
              <td>${application.application_status}</td>
              <td>
                <label for="status" class="edit-button">Edit</label>
                <select name="" id="status" class="edit-status">
                  <option value="" selected>Status</option>
                  <option value="Approved">Approve</option>
                  <option value="Rejected">Reject</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
            </tr>
    `;

    tableHTML += html;
  });

  document.querySelector("table").innerHTML += tableHTML;
  //   const editButtonEl = document.querySelector(".edit-button");

  //   editButtonEl.addEventListener("click", () => {
  //     const statusEL = document.querySelector(".edit-status");

  //     statusEL.style.display = "block";

  //     editButtonEl.style.display = "none";
  //   });
});
