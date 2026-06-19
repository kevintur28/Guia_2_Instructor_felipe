/* ─── THEME TOGGLE ────────────────────────────────────────────── */
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const icon = btn ? btn.querySelector('.toggle-icon') : null;
  const label = btn ? btn.querySelector('.toggle-label') : null;

  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateButton(saved);

  if (btn) {
    btn.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateButton(next);
    });
  }

  function updateButton(theme) {
    if (!btn) return;
    if (theme === 'dark') {
      if (icon)  icon.textContent  = '🌙';
      if (label) label.textContent = 'Modo Oscuro';
    } else {
      if (icon)  icon.textContent  = '☀️';
      if (label) label.textContent = 'Modo Claro';
    }
  }
})();

/* ─── GLOSSARY ────────────────────────────────────────────────── */
const glossary = [
  ["Color Theory", "Teoria del color", "Study of how colors interact and create visual perception."],
  ["Pantone", "Pantone", "Standardized color system used to identify and reproduce colors."],
  ["User Experience", "Experiencia de usuario", "How a person feels and behaves when using a digital product."],
  ["Interface", "Interfaz", "Visual space where users interact with a system."],
  ["Contrast", "Contraste", "Difference between visual elements that improves hierarchy and readability."],
  ["Palette", "Paleta", "Selected group of colors used in a design project."],
  ["Branding", "Identidad de marca", "Visual and strategic identity that represents a brand."],
  ["Typography", "Tipografia", "Style and arrangement of text in visual communication."],
  ["Layout", "Composicion", "Organization of content inside a page or screen."],
  ["Accessibility", "Accesibilidad", "Practice of making products usable for different people and abilities."],
  ["Responsive Design", "Diseno adaptable", "Technique that allows a website to adapt to different screen sizes."],
  ["Sustainability", "Sostenibilidad", "Responsible use of resources to reduce negative impact."],
  ["Circular Economy", "Economia circular", "Model focused on reducing waste and reusing resources."],
  ["Visual Hierarchy", "Jerarquia visual", "Order that guides attention through size, color, spacing, and contrast."],
  ["Semiotics", "Semiologia", "Study of signs and meanings in communication."],
  ["Prototype", "Prototipo", "Early model used to test the structure or behavior of a product."]
];

const glossaryBody = document.querySelector("#glossaryBody");

glossary.forEach(([english, spanish, definition]) => {
  const row = document.createElement("tr");
  row.innerHTML = `<td><strong>${english}</strong></td><td>${spanish}</td><td>${definition}</td>`;
  glossaryBody.appendChild(row);
});

/* ─── LANGUAGE TOGGLE ─────────────────────────────────────────── */
const toggleButton = document.querySelector("#toggleLanguage");
const panels = document.querySelectorAll(".language-panel");
let currentLanguage = "es";

toggleButton.addEventListener("click", () => {
  currentLanguage = currentLanguage === "es" ? "en" : "es";
  panels.forEach((panel) => {
    panel.classList.toggle("d-none", panel.dataset.lang !== currentLanguage);
  });
  toggleButton.textContent = currentLanguage === "es" ? "Cambiar a ingles" : "Switch to Spanish";
});

/* ─── BOOTSTRAP FALLBACK ──────────────────────────────────────── */
if (!window.bootstrap) {
  document.querySelectorAll(".accordion [data-bs-toggle='collapse']").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.bsTarget);
      const parent = button.closest(".accordion");

      if (parent) {
        parent.querySelectorAll(".accordion-collapse").forEach((panel) => {
          if (panel !== target) panel.classList.remove("show");
        });
        parent.querySelectorAll(".accordion-button").forEach((item) => {
          if (item !== button) item.classList.add("collapsed");
        });
      }

      target.classList.toggle("show");
      button.classList.toggle("collapsed", !target.classList.contains("show"));
    });
  });

  document.querySelectorAll("[data-bs-toggle='modal']").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.bsTarget).classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelectorAll("[data-bs-dismiss='modal'], .modal").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target !== element && !element.matches("[data-bs-dismiss='modal']")) return;
      const modal = element.closest(".modal") || element;
      modal.classList.remove("show");
      document.body.style.overflow = "";
    });
  });

  document.querySelectorAll(".carousel").forEach((carousel) => {
    const items = [...carousel.querySelectorAll(".carousel-item")];
    const indicators = [...carousel.querySelectorAll(".carousel-indicators button")];
    let index = Math.max(0, items.findIndex((item) => item.classList.contains("active")));

    const showSlide = (nextIndex) => {
      index = (nextIndex + items.length) % items.length;
      items.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === index));
      indicators.forEach((indicator, itemIndex) => {
        indicator.classList.toggle("active", itemIndex === index);
        indicator.toggleAttribute("aria-current", itemIndex === index);
      });
    };

    carousel.querySelector("[data-bs-slide='prev']")?.addEventListener("click", () => showSlide(index - 1));
    carousel.querySelector("[data-bs-slide='next']")?.addEventListener("click", () => showSlide(index + 1));
    indicators.forEach((indicator, itemIndex) => indicator.addEventListener("click", () => showSlide(itemIndex)));
  });
}

/* ─── NAVBAR TOGGLER ──────────────────────────────────────────── */
document.querySelectorAll(".navbar-toggler").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(button.dataset.menuTarget);
    target.classList.remove("collapsing");
    target.classList.toggle("show");
    button.setAttribute("aria-expanded", String(target.classList.contains("show")));
  });
});
