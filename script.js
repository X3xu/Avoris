document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  initModal();
  initCarousel();
  initToggles();
  initFilterBlocks();
  initPriceFilters();
});

// 🔍 Filtro de tarjetas por etiquetas
function initFilters() {
  const checkboxes = document.querySelectorAll(".filters__option input[type='checkbox']");
  const cards = document.querySelectorAll(".card");

  function getSelectedFilters() {
    return Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.parentElement.textContent.trim().replace(/ i(\s*)$/, '').toLowerCase());
  }

  function filterCards() {
    const selectedFilters = getSelectedFilters();

    cards.forEach(card => {
      const tags = Array.from(card.querySelectorAll(".card__tag"))
        .map(tag => tag.textContent.trim().toLowerCase());

      const hasMatch = selectedFilters.length === 0 || tags.some(tag => selectedFilters.includes(tag));
      card.style.display = hasMatch ? "block" : "none";
    });
  }

  checkboxes.forEach(cb => cb.addEventListener("change", filterCards));
  filterCards();
}

// 🪟 Modal para "Ver desglose"
function initModal() {
  const modal = document.querySelector(".modal-overlay");
  const closeModalBtn = document.querySelector(".modal__close");
  const extraCloseBtn = document.getElementById("cerrarModal");

  if (extraCloseBtn) {
    extraCloseBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }

  document.querySelectorAll(".card__link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      modal.classList.remove("hidden");
    });
  });

  closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}

// 🖼️ Carrusel de imágenes
function initCarousel() {
  const slides = document.querySelectorAll('.carousel__slide');
  const dots = document.querySelectorAll('.carousel__dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const wrapper = document.getElementById('carouselSlides');

  let currentSlide = 0;

  const updateCarousel = () => {
    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('carousel__dot--active'));
    dots[currentSlide].classList.add('carousel__dot--active');
  };

  const goToSlide = index => {
    currentSlide = (index + slides.length) % slides.length;
    updateCarousel();
  };

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide, 10));
    });
  });

  setInterval(() => goToSlide(currentSlide + 1), 5000);
}

// 🎛️ Mostrar/Ocultar bloques de filtros
function initToggles() {
  function setupToggle(triggerSelector, targetSelector, { hideTrigger = false, showOnly = false } = {}) {
    const trigger = document.querySelector(triggerSelector);
    const target = document.querySelector(targetSelector);

    if (!trigger || !target) {
      console.warn('Elementos no encontrados:', { triggerSelector, targetSelector });
      return;
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      target.style.display = showOnly ? 'block' : (target.style.display === 'block' ? 'none' : 'block');
      if (hideTrigger) trigger.style.display = 'none';
    });
  }

  setupToggle('.filter__button', '.filters');
  setupToggle('#cerrarFilters', '.filters');
}

// ⬇️ Expansión/colapso de secciones de filtros
function initFilterBlocks() {
  const filterBlocks = document.querySelectorAll('.filters__block');

  filterBlocks.forEach(block => {
    const title = block.querySelector('.filters__block-title');
    if (title) {
      title.addEventListener('click', () => {
        block.classList.toggle('filters__block--open');
      });
    }
  });
}

function initPriceFilters() {
    const minInput = document.getElementById("precioMinimo");
    const maxInput = document.getElementById("precioMaximo");
    const cards = document.querySelectorAll(".card");

    function parsePrice(text) {
        return parseFloat(text.replace("€", "").replace(".", "").replace(",", ".").trim());
    }

    function filterCards() {
        const min = parseFloat(minInput.value.replace(",", "."));
        const max = parseFloat(maxInput.value.replace(",", "."));

        cards.forEach(card => {
            const priceText = card.querySelector(".card__price strong").textContent;
            const price = parsePrice(priceText);

            const show =
                (!isNaN(min) ? price >= min : true) &&
                (!isNaN(max) ? price <= max : true);

            card.style.display = show ? "block" : "none";
        });
    }

    minInput.addEventListener("input", filterCards);
    maxInput.addEventListener("input", filterCards);
}
