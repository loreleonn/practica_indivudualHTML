document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.img-menu');
  const menu = document.getElementById('menu');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('activo');
    });
+
    document.addEventListener('click', (e) => {
      if (
        menu.classList.contains('activo') &&
        !menu.contains(e.target) &&
        e.target !== menuBtn
      ) {
        menu.classList.remove('activo');
      }
    });
  }
});
