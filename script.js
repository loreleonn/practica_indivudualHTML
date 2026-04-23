console.log("JS cargado");

document.addEventListener('DOMContentLoaded', () => {
  // Menu functionality
  const menuBtn = document.querySelector('.img-menu');
  const menu = document.getElementById('menu');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('activo');
    });

    document.addEventListener('click', (e) => {
      if (menu.classList.contains('activo') && !menu.contains(e.target) && e.target !== menuBtn) {
        menu.classList.remove('activo');
      }
    });
  }

  // Load records from API and populate carousels
  loadRecords();
});

async function loadRecords() {
  try {
    const response = await fetch('/api/records');
    const data = await response.json();
    const records = data.records;

    // Separate into novelties and best sellers (for simplicity, use first few as novelties, rest as best sellers)
    const novelties = records.slice(0, 5);
    const bestSellers = records.slice(5);

    populateCarousel('portadas-novedades', novelties);
    populateCarousel('portadas-best-sellers', bestSellers);

    // Initialize carousels after populating
    initializeCarousel('portadas-novedades');
    initializeCarousel('portadas-best-sellers');
  } catch (error) {
    console.error('Error loading records:', error);
  }
}

function populateCarousel(containerId, records) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ''; // Clear existing

  records.forEach(record => {
    const portada = document.createElement('div');
    portada.className = 'portada';

    portada.innerHTML = `
      <img src="${record.image_path}" alt="${record.title}" class="imagen-portadas">
      <p class="texto1">${record.title}</p>
      <p class="texto2">${record.artist}</p>
    `;

    container.appendChild(portada);
  });
}

function initializeCarousel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let index = 0;
  const itemWidth = 320;
  const totalItems = container.children.length;

  // Find buttons with matching data-target
  const btnIzq = document.querySelector(`.btn-carrusel.izquierda[data-target="${containerId}"]`);
  const btnDer = document.querySelector(`.btn-carrusel.derecha[data-target="${containerId}"]`);

  if (btnDer) {
    btnDer.addEventListener('click', () => {
      index = Math.min(index + 1, totalItems - 1);
      container.style.transform = `translateX(${-index * itemWidth}px)`;
    });
  }

  if (btnIzq) {
    btnIzq.addEventListener('click', () => {
      index = Math.max(index - 1, 0);
      container.style.transform = `translateX(${-index * itemWidth}px)`;
    });
  }
} 

  btnDer.addEventListener("click", () => {
    index++;
    contenedor.style.transform = `translateX(${-index * itemWidth}px)`;
  });

  btnIzq.addEventListener("click", () => {
    index--;
    if (index < 0) index = 0;
    contenedor.style.transform = `translateX(${-index * itemWidth}px)`;
  });
