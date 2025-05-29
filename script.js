document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".filters__option input[type='checkbox']");
  const cards = document.querySelectorAll(".card");

  function getSelectedFilters() {
    const selected = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        // Obtenemos el texto completo del label.
        let labelText = checkbox.parentElement.textContent.trim();

        // Eliminamos el texto del icono de información 'i' si está presente.
        labelText = labelText.replace(/ i(\s*)$/, '').toLowerCase();

        selected.push(labelText);
      }
    });
    return selected;
  }

  function filterCards() {
    const selectedFilters = getSelectedFilters();

    if (selectedFilters.length === 0) {
      cards.forEach((card) => {
        card.style.display = "block";
      });
      return;
    }

    cards.forEach((card, index) => {
      const tagElements = card.querySelectorAll(".card__tag");
      const tags = Array.from(tagElements).map(tagEl => tagEl.textContent.trim().toLowerCase());
      const hasMatch = tags.some(cardTag => {
        console.log(cardTag);
        const isMatch = selectedFilters.includes(cardTag);
        return isMatch;
      });

      card.style.display = hasMatch ? "block" : "none";
    });
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterCards);
  });

  filterCards();
});


// Funcionalidad ver precios
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal-overlay");
  const closeModalBtn = document.querySelector(".modal__close");
  const extraCloseBtn = document.getElementById("cerrarModal");

  if (extraCloseBtn) {
    extraCloseBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // Abre modal al hacer clic en cualquier "Ver desglose"
  document.querySelectorAll(".card__link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      modal.classList.remove("hidden");
    });
  });

  // Cierra modal al hacer clic en el botón de cerrar
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Cierra modal si haces clic fuera del modal (en el overlay)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});


// Funcionalidad carrusel
document.addEventListener('DOMContentLoaded', () => {
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
      const index = parseInt(dot.dataset.slide, 10);
      goToSlide(index);
    });
  });


  setInterval(() => goToSlide(currentSlide + 1), 5000);
});



document.addEventListener('DOMContentLoaded', () => {
  function setupToggle(triggerSelector, targetSelector, { hideTrigger = false, showOnly = false } = {}) {
    const trigger = document.querySelector(triggerSelector);
    const target = document.querySelector(targetSelector);

    if (!trigger || !target) {
      console.warn('Elementos no encontrados:', { triggerSelector, targetSelector });
      return;
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();

      if (showOnly) {
        target.style.display = 'block';
      } else {
        target.style.display = target.style.display === 'block' ? 'none' : 'block';
      }

      if (hideTrigger) {
        trigger.style.display = 'none';
      }
    });
  }

  // Configuración de botones
  setupToggle('.filter__button', '.filters');
  setupToggle('#cerrarFilters', '.filters');
});


document.addEventListener('DOMContentLoaded', () => {
    const filterBlocks = document.querySelectorAll('.filters__block');

    filterBlocks.forEach(block => {
        const title = block.querySelector('.filters__block-title');

        if (title) {
            title.addEventListener('click', () => {
                block.classList.toggle('filters__block--open');
            });
        }
    });
});

