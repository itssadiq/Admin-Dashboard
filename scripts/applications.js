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

  renderApplications();

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

  const statusFilter = document.querySelector(".status-filter");

  statusFilter.addEventListener("change", () => {
    const value = statusFilter.value;
    let tableHTML = generateTableHead();

    applications.forEach((application, index) => {
      if (value === application.application_status) {
        const html = generateApplicationsHTML(application, index);
        tableHTML += html;
        document.querySelector("table").innerHTML = tableHTML;
      } else if (value === "All Statuses") {
        renderApplications();
      }
    });
  });

  const program1Filter = document.querySelector(".program1-filter");

  program1Filter.addEventListener("change", () => {
    const program1Value = program1Filter.value;
    let tableHTML = generateTableHead();

    applications.forEach((application, index) => {
      if (program1Value === application.program_1) {
        const html = generateApplicationsHTML(application, index);
        tableHTML += html;
        document.querySelector("table").innerHTML = tableHTML;
      }
    });
  });

  const program2Filter = document.querySelector(".program2-filter");

  program2Filter.addEventListener("change", () => {
    const program2Value = program2Filter.value;
    let tableHTML = generateTableHead();

    applications.forEach((application, index) => {
      if (program2Value === application.program_2) {
        const html = generateApplicationsHTML(application, index);
        tableHTML += html;
        document.querySelector("table").innerHTML = tableHTML;
      }
    });
  });

  function renderApplications() {
    let tableHTML = generateTableHead();
    applications.forEach((application, index) => {
      const html = generateApplicationsHTML(application, index);
      tableHTML += html;
    });

    document.querySelector("table").innerHTML = tableHTML;
  }

  function generateApplicationsHTML(application, index) {
    const applicationID = application.id;
    const trimmed = applicationID.substring(0, 7);
    const appID = `APP-${trimmed}`;
    const applicationDate = application.created_at;
    const cleanedDateStr = applicationDate.replace(/\.\d+/, "");
    const date = new Date(cleanedDateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const html = `
            <tr>
              <td>${appID}</td>
              <td>
                <p>${application.full_name}</p>
                <p>${application.email}</p>
              </td>
              <td>${application.program_1}</td>
              <td>${application.program_2}</td>
              <td>${formattedDate}</td>
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

    return html;
  }

  function generateTableHead() {
    let tableHTML = `
      <tr>
        <td>APPLICATION ID</td>
        <td>NAME</td>
        <td>PROGRAM1</td>
        <td>PROGRAM2</td>
        <td>DATE APPLIED</td>
        <td>STATUS</td>
        <td>CHANGE STATUS</td>
      </tr>
    `;

    return tableHTML;
  }
});
