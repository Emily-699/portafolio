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
// VALIDACIÓN FORMULARIO EN TIEMPO REAL
// ===================
const form = document.querySelector("#section-contact form");
const inputs = form.querySelectorAll("input[required], textarea[required]");

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.validity.valid) {
      input.style.borderColor = "green";
    } else {
      input.style.borderColor = "red";
    }
  });
});

// Validación al enviar el formulario
form.addEventListener("submit", (e) => {
  let valid = true;
  inputs.forEach((input) => {
    if (!input.validity.valid) {
      input.style.borderColor = "red";
      valid = false;
    }
  });

  if (!valid) {
    e.preventDefault();
    alert("Por favor completa todos los campos correctamente.");
  }
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
