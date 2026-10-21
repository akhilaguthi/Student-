
const $ = (id) => document.getElementById(id);

const modal = $("editModal");
const form = $("profileForm");

const defaultProfile = {
  name: "Guthi Sai Akhila",
  email: "akhilagutthi@gmail.com",
  college: "Mohan Babu University",
  cgpa: "",
  summary:
    "Motivated AI/ML student with knowledge of Python, Java, Machine Learning, and Data Science concepts. Interested in Artificial Intelligence, Deep Learning, and Computer Vision. Seeking internship opportunities to apply technical skills to real-world projects and gain industry experience."
};

let profile = { ...defaultProfile };

try {
  const saved = localStorage.getItem("akhilaStudentProfile");

  if (saved) {
    profile = { ...profile, ...JSON.parse(saved) };
  }
} catch (error) {
  console.warn("Could not load saved profile.", error);
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || "")
    .join("");
}

function renderProfile() {
  const firstName = profile.name.trim().split(/\s+/)[0] || "Student";
  const initials = getInitials(profile.name);

  $("welcomeName").textContent = firstName;
  $("profileName").textContent = profile.name;
  $("profileEmail").textContent = profile.email;
  $("collegeName").textContent = profile.college;
  $("profileInitials").textContent = initials;
  document.querySelector(".avatar").textContent = initials;
  document.querySelector(".small-avatar").textContent = initials;

  $("cgpaStat").textContent = profile.cgpa.trim() || "Not provided";

  $("nameInput").value = profile.name;
  $("emailInput").value = profile.email;
  $("collegeInput").value = profile.college;
  $("cgpaInput").value = profile.cgpa;
  $("summaryInput").value = profile.summary;
}

function openModal() {
  renderProfile();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  $("nameInput").focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

$("editButton").addEventListener("click", openModal);
$("profileEditButton").addEventListener("click", openModal);
$("editShortcut").addEventListener("click", openModal);
$("closeModal").addEventListener("click", closeModal);
$("cancelEdit").addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  profile = {
    name: $("nameInput").value.trim(),
    email: $("emailInput").value.trim(),
    college: $("collegeInput").value.trim(),
    cgpa: $("cgpaInput").value.trim(),
    summary: $("summaryInput").value.trim()
  };

  try {
    localStorage.setItem(
      "akhilaStudentProfile",
      JSON.stringify(profile)
    );
  } catch (error) {
    console.warn("Browser storage is unavailable.", error);
  }

  renderProfile();
  closeModal();
  showToast("Profile updated successfully!");
});

function showToast(message) {
  const toast = $("toast");

  toast.textContent = message;
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

$("menuButton").addEventListener("click", () => {
  $("sidebar").classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
    $("sidebar").classList.remove("open");
  });
});

$("searchInput").addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase().trim();

  document.querySelectorAll(".searchable").forEach((section) => {
    const matches = section.textContent
      .toLowerCase()
      .includes(query);

    section.classList.toggle("hidden-by-search", !matches);
  });
});

$("year").textContent = new Date().getFullYear();

renderProfile();
