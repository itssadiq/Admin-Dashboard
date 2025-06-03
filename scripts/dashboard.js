import { fetchApplicationsDetailsFromDB } from "../backend/database.js";

document.addEventListener("DOMContentLoaded", async () => {
  let applications;

  try {
    const data = await fetchApplicationsDetailsFromDB();
    applications = data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  const totalApplications = applications.length;
  const applicationsStatus = [];
  applications.forEach((application) => {
    applicationsStatus.push(application.application_status);
  });
  let pendingReviews = 0;
  let approved = 0;
  let rejected = 0;
  applicationsStatus.forEach((status) => {
    if (status == "Pending") {
      pendingReviews++;
    } else if (status == "Approved") {
      approved++;
    } else if (status == "Rejected") {
      rejected++;
    }
  });

  document.querySelector(".js-total-applications").innerHTML =
    totalApplications;
  document.querySelector(".js-pending-reviews").innerHTML = pendingReviews;
  document.querySelector(".js-approved").innerHTML = approved;
  document.querySelector(".js-rejected").innerHTML = rejected;
});
