/* ─── THEME TOGGLE ────────────────────────────────────────────── */
(function () {
  const html  = document.documentElement;
  const btn   = document.getElementById('themeToggle');
  const icon  = btn ? btn.querySelector('.toggle-icon')  : null;
  const label = btn ? btn.querySelector('.toggle-label') : null;

  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateButton(saved);

  if (btn) {
    btn.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
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
  ["Color Theory",      "Teoria del color",      "Study of how colors interact and create visual perception."],
  ["Pantone",           "Pantone",               "Standardized color system used to identify and reproduce colors."],
  ["User Experience",   "Experiencia de usuario","How a person feels and behaves when using a digital product."],
  ["Interface",         "Interfaz",              "Visual space where users interact with a system."],
  ["Contrast",          "Contraste",             "Difference between visual elements that improves hierarchy and readability."],
  ["Palette",           "Paleta",                "Selected group of colors used in a design project."],
  ["Branding",          "Identidad de marca",    "Visual and strategic identity that represents a brand."],
  ["Typography",        "Tipografia",            "Style and arrangement of text in visual communication."],
  ["Layout",            "Composicion",           "Organization of content inside a page or screen."],
  ["Accessibility",     "Accesibilidad",         "Practice of making products usable for different people and abilities."],
  ["Responsive Design", "Diseno adaptable",      "Technique that allows a website to adapt to different screen sizes."],
  ["Sustainability",    "Sostenibilidad",        "Responsible use of resources to reduce negative impact."],
  ["Circular Economy",  "Economia circular",     "Model focused on reducing waste and reusing resources."],
  ["Visual Hierarchy",  "Jerarquia visual",      "Order that guides attention through size, color, spacing, and contrast."],
  ["Semiotics",         "Semiologia",            "Study of signs and meanings in communication."],
  ["Prototype",         "Prototipo",             "Early model used to test the structure or behavior of a product."]
];

const glossaryBody = document.querySelector("#glossaryBody");
if (glossaryBody) {
  glossary.forEach(([english, spanish, definition]) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td><strong>${english}</strong></td><td>${spanish}</td><td>${definition}</td>`;
    glossaryBody.appendChild(row);
  });
}

/* ─── LANGUAGE TOGGLE ─────────────────────────────────────────── */
const toggleButton = document.querySelector("#toggleLanguage");
const panels       = document.querySelectorAll(".language-panel");
let currentLanguage = "es";

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "es" ? "en" : "es";
    panels.forEach((panel) => {
      panel.classList.toggle("d-none", panel.dataset.lang !== currentLanguage);
    });
    toggleButton.textContent =
      currentLanguage === "es" ? "Cambiar a ingles" : "Switch to Spanish";
  });
}

/* ─── ACCORDION ───────────────────────────────────────────────── */
document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Acepta tanto data-bs-target (Bootstrap) como data-bs-toggle="collapse"
    const targetSel = button.getAttribute("data-bs-target");
    if (!targetSel) return;
    const target = document.querySelector(targetSel);
    if (!target) return;

    const parent = button.closest(".accordion");

    // Cierra los demás paneles del mismo accordion
    if (parent) {
      parent.querySelectorAll(".accordion-collapse").forEach((panel) => {
        if (panel !== target) {
          panel.classList.remove("show");
          panel.style.display = "none";
        }
      });
      parent.querySelectorAll(".accordion-button").forEach((btn) => {
        if (btn !== button) btn.classList.add("collapsed");
      });
    }

    const isOpen = target.classList.contains("show");
    target.classList.toggle("show", !isOpen);
    target.style.display  = isOpen ? "none" : "block";
    button.classList.toggle("collapsed", isOpen);
    button.setAttribute("aria-expanded", String(!isOpen));
  });
});

/* Inicializar estado visible de accordions al cargar */
document.querySelectorAll(".accordion-collapse").forEach((panel) => {
  panel.style.display = panel.classList.contains("show") ? "block" : "none";
});

/* ─── MODAL ───────────────────────────────────────────────────── */
/* Inicializar modals ocultos */
document.querySelectorAll(".modal").forEach((modal) => {
  modal.style.display = "none";
});

document.querySelectorAll("[data-bs-toggle='modal']").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.getAttribute("data-bs-target"));
    if (!target) return;
    target.classList.add("show");
    target.style.display      = "flex";
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll("[data-bs-dismiss='modal']").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    if (!modal) return;
    modal.classList.remove("show");
    modal.style.display          = "none";
    document.body.style.overflow = "";
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      modal.style.display          = "none";
      document.body.style.overflow = "";
    }
  });
});

/* ─── CAROUSEL ────────────────────────────────────────────────── */
document.querySelectorAll(".carousel").forEach((carousel) => {
  const items      = [...carousel.querySelectorAll(".carousel-item")];
  const indicators = [...carousel.querySelectorAll(".carousel-indicators button")];
  if (!items.length) return;

  let index = Math.max(0, items.findIndex((item) => item.classList.contains("active")));

  const showSlide = (nextIndex) => {
    index = (nextIndex + items.length) % items.length;
    items.forEach((item, i) => item.classList.toggle("active", i === index));
    indicators.forEach((ind, i) => {
      ind.classList.toggle("active", i === index);
      ind.toggleAttribute("aria-current", i === index);
    });
  };

  const prevBtn = carousel.querySelector("[data-bs-slide='prev']");
  const nextBtn = carousel.querySelector("[data-bs-slide='next']");
  if (prevBtn) prevBtn.addEventListener("click", () => showSlide(index - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showSlide(index + 1));
  indicators.forEach((ind, i) => ind.addEventListener("click", () => showSlide(i)));
});

/* ─── NAVBAR TOGGLER ──────────────────────────────────────────── */
document.querySelectorAll(".navbar-toggler").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(button.dataset.menuTarget);
    if (!target) return;
    target.classList.remove("collapsing");
    target.classList.toggle("show");
    button.setAttribute("aria-expanded", String(target.classList.contains("show")));
  });
});
