export function getAdmin() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  return admin;
}

export function showSettings(admin) {
  const adminName = admin.full_name;
  const settings = document.querySelector(".settings-tab");

  if (adminName === "Sadiq Ali") {
    settings.style.display = "block";
  }
}
