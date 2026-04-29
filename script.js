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
    const records = data.records || [];

    if (records.length === 0) {
      showEmptyState('portadas-novedades', 'No hay novedades disponibles.');
      showEmptyState('portadas-best-sellers', 'No hay best sellers disponibles.');
      return;
    }

    const novelties = [...records]
      .sort((a, b) => (b.id || 0) - (a.id || 0))
      .slice(0, Math.min(5, records.length));

    let bestSellers = [...records]
      .sort((a, b) => (b.stock || 0) - (a.stock || 0));

    if (records.length > 5) {
      bestSellers = bestSellers.filter(record => !novelties.some(n => n.id === record.id));
    }

    bestSellers = bestSellers.slice(0, Math.min(5, records.length));

    populateCarousel('portadas-novedades', novelties);
    populateCarousel('portadas-best-sellers', bestSellers);

    initializeCarousel('portadas-novedades');
    initializeCarousel('portadas-best-sellers');
  } catch (error) {
    console.error('Error loading records:', error);
  }
}

function showEmptyState(containerId, message) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<div class="mensaje-vacio">${message}</div>`;
}

function populateCarousel(containerId, records) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ''; 

  if (records.length === 0) {
    showEmptyState(containerId, 'No hay registros disponibles.');
    return;
  }

  records.forEach(record => {
    const portada = document.createElement('div');
    portada.className = 'portada';

    portada.innerHTML = `
      <img src="${record.image_path || './imagenes/default.jpg'}" alt="${record.title}" class="imagen-portadas">
      <p class="texto1">${record.title || 'Título desconocido'}</p>
      <p class="texto2">${record.artist || 'Artista desconocido'}</p>
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
