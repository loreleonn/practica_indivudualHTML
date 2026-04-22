console.log("JS cargado"); // si funciona, deja el dom en paz lorena 
const contenedor = document.getElementById("cajas-novedades");
const btnIzq = document.querySelector(".btn-carrusel.izquierda");
const btnDer = document.querySelector(".btn-carrusel.derecha");

console.log("contenedor:", contenedor);
console.log("btnIzq:", btnIzq);
console.log("btnDer:", btnDer);

document.addEventListener('DOMContentLoaded', () => {

//menu 



  const menuBtn = document.querySelector('.img-menu');
  const menu = document.getElementById('menu');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('activo');
    });

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

  //carrusel 

document.addEventListener("DOMContentLoaded", () => {
  

  const carrusel = document.querySelector(".carrusel");
  const contenedor = carrusel.querySelector(".contenedor-cajas1");
  const btnIzq = carrusel.querySelector(".btn-carrusel.izquierda");
  const btnDer = carrusel.querySelector(".btn-carrusel.derecha");

  console.log(contenedor, btnIzq, btnDer);

  let index = 0;
  const itemWidth = 320; 

  btnDer.addEventListener("click", () => {
    index++;
    contenedor.style.transform = `translateX(${-index * itemWidth}px)`;
  });

  btnIzq.addEventListener("click", () => {
    index--;
    if (index < 0) index = 0;
    contenedor.style.transform = `translateX(${-index * itemWidth}px)`;
  });
});

});