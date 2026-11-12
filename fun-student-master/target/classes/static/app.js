const ADMIN_DOMAINS  = ["@admin.ru", "@superadmin.ru"];
const TEACHER_DOMAIN = "@teacher.ru";
function getRole(email) {
  const e = email.trim().toLowerCase();
  if (ADMIN_DOMAINS.some(d => e.endsWith(d))) return "ADMIN";
  if (e.endsWith(TEACHER_DOMAIN)) return "TEACHER";
  return null;
}
let students = [];
const screens = {
  login:   document.getElementById("loginScreen"),
  admin:   document.getElementById("adminScreen"),
  teacher: document.getElementById("teacherScreen"),
};
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("emailInput").value.trim();
  const error = document.getElementById("loginError");
  error.classList.add("hidden");
  if (!email) {
    error.textContent = "Введите почту";
    error.classList.remove("hidden");
    return;
  }
  const role = getRole(email);
  if (role === "ADMIN") {
    showScreen("admin");
  } else if (role === "TEACHER") {
    document.getElementById("searchResult").textContent = "";
    document.getElementById("searchInput").value = "";
    showScreen("teacher");
  } else {
    error.textContent = "Ошибка";
    error.classList.remove("hidden");
  }
});
document.getElementById("emailInput").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("loginBtn").click();
});
document.getElementById("addStudentBtn").addEventListener("click", () => {
  const name = prompt("Имя ученика для добавления:");
  if (!name || !name.trim()) return;
  students.push(name.trim());
});
document.getElementById("deleteStudentBtn").addEventListener("click", () => {
  const name = prompt("Имя ученика для удаления:");
  if (!name || !name.trim()) return;
  const before = students.length;
  students = students.filter(s => s.toLowerCase() !== name.trim().toLowerCase());
});
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const box = document.getElementById("searchResult");
  if (!query || students.length === 0) {
    box.textContent = "";
    return;
  }
  const found = students.filter(s => s.toLowerCase().includes(query));
  box.textContent = found.length === 0 ? "" : found.join("\n");
});
document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("searchBtn").click();
});