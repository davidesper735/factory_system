// CONTROLADOR: abre y cierra el menú en celular.
const boton = document.getElementById("menu-boton");
const menu = document.getElementById("menu-principal");

function alternarMenu() {
  const abierto = menu.classList.toggle("menu--abierto"); // true si quedó abierto
  boton.setAttribute("aria-expanded", abierto);
  if (abierto) {
    boton.setAttribute("aria-label", "Cerrar menú");
  } else {
    boton.setAttribute("aria-label", "Abrir menú");
  }
}

boton.addEventListener("click", alternarMenu);
