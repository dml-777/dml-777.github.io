const toggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    toggle.textContent = "Dark Mode";
  }
}

const saved = localStorage.getItem("theme") || "light";
applyTheme(saved);

toggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});