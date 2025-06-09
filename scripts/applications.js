import {
  fetchApplicationsDetailsFromDB,
  updateApplicationStatusInDB,
} from "../backend/database.js";

document.addEventListener("DOMContentLoaded", async () => {
  let applications;
  try {
    const data = await fetchApplicationsDetailsFromDB();
    applications = data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  let tableHTML = "";
  applications.forEach((application, index) => {
    const applicationID = application.id;
    const trimmed = applicationID.substring(0, 7);
    const appID = `APP-${trimmed}`;

    const html = `
            <tr>
              <td>${appID}</td>
              <td>
                <p>${application.full_name}</p>
                <p>${application.email}</p>
              </td>
              <td>${application.program_1}</td>
              <td>${application.program_2}</td>
              <td>08-06-2025</td>
              <td>${application.application_status}</td>
              <td>
                <label for="status${index}" class="edit-button" data-index="${index}">Edit</label>
                <select name="" id="status${index}" class="edit-status" data-index="${index}">
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
  const editButtonEl = document.querySelectorAll(".edit-button");

  editButtonEl.forEach((button) => {
    button.addEventListener("click", () => {
      const statusEL = document.querySelectorAll(".edit-status");

      statusEL.forEach((status) => {
        if (status.dataset.index == button.dataset.index) {
          button.style.display = "none";
          status.style.display = "block";

          const index = status.dataset.index;

          status.addEventListener("change", () => {
            const updatedStatus = status.value;

            const application = applications[index];

            const id = application.id;

            try {
              updateApplicationStatusInDB(updatedStatus, id);
              setTimeout(() => {
                location.reload();
              }, 500);
            } catch (error) {
              console.error(
                "Error updating application status:",
                error.message
              );
            }
          });
        }
      });
    });
  });
});
