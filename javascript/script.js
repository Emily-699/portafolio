// javascript/script.js
// Script robusto: menu hamburguesa, toggle tema, reveal y scroll suave

// Helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// MENU HAMBURGUESA
const menuBtn = $("#menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");            // control visual en CSS (.open)
    menuBtn.classList.toggle("open");
  });
}

// Cerrar menu al clicar un link (mobile)
if (navLinks) {
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      menuBtn.classList.remove("open");
    }
  });
}

// THEME TOGGLE (persistente)
const themeToggle = $("#theme-toggle");
const root = document.documentElement;
const body = document.body;
const saved = localStorage.getItem("theme") || null;

function applyTheme(theme) {
  if (theme === "dark") body.classList.add("dark");
  else body.classList.remove("dark");
  localStorage.setItem("theme", theme);
  if (themeToggle) themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

if (saved) applyTheme(saved);
else {
  // mantener preferencia del OS si no hay guardado
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const now = body.classList.contains("dark") ? "dark" : "light";
    applyTheme(now === "dark" ? "light" : "dark");
  });
}

// SMOOTH SCROLL para los links de nav
$$("a[href^='#']").forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#" || href.startsWith("http")) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 70; // ajustar si header es sticky
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// Reveal simple al hacer scroll (sin IntersectionObserver por compatibilidad)
const toReveal = $$(".fade-in, .fade-up, .blur-in, .stagger");
function revealHandler() {
  const h = window.innerHeight;
  toReveal.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    if (r.top < h - 80) {
      el.classList.add("visible");
      // stagger delay
      if (el.classList.contains("stagger")) {
        el.style.transitionDelay = `${i * 60}ms`;
      }
    }
  });
}
window.addEventListener("scroll", revealHandler);
window.addEventListener("load", revealHandler);
