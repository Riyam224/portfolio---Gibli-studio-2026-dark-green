// Theme toggle with smooth transition
const toggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const themeIcon = document.querySelector(".theme-icon");

toggle.onclick = () => {
   const currentTheme = html.dataset.theme;
   const newTheme = currentTheme === "dark" ? "light" : "dark";

   html.dataset.theme = newTheme;
   themeIcon.textContent = newTheme === "dark" ? "☾" : "☀";

   // Store preference
   localStorage.setItem("theme", newTheme);
};

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "dark";
html.dataset.theme = savedTheme;
themeIcon.textContent = savedTheme === "dark" ? "☾" : "☀";
