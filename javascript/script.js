// ===================
// MENÚ HAMBURGUESA
// ===================
const nav = document.querySelector("nav");
const header = document.querySelector("header");

// Crear el botón hamburguesa dinámicamente
const burgerBtn = document.createElement("button");
burgerBtn.innerHTML = "☰";
burgerBtn.classList.add("burger-btn");
header.prepend(burgerBtn);

// Mostrar/Ocultar menú en móviles
burgerBtn.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
});




// ===================
// ANIMACIÓN: Resaltar títulos al hacer scroll
// ===================
const sections = document.querySelectorAll("section h2");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("highlight-title");
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((h2) => observer.observe(h2));



/* Menu Mobile */
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* Theme toggle (persist in localStorage) */
const themeToggle = document.getElementById("theme-toggle");
const rootBody = document.body;

function applyTheme(theme) {
  if (theme === "dark") rootBody.classList.add("dark");
  else rootBody.classList.remove("dark");
  localStorage.setItem("theme", theme);
}

/* Load saved theme */
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);
if (themeToggle) {
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  themeToggle.addEventListener("click", () => {
    const current = rootBody.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
  });
}

/* Simple reveal on scroll for .fade-up / .fade-in / .blur-in */
const revealElements = document.querySelectorAll(".fade-up, .fade-in, .blur-in, .stagger");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      // add a little stagger
      if (el.classList.contains("stagger")) {
        setTimeout(() => el.classList.add("show"), i * 80);
      } else {
        el.classList.add("visible");
      }
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
