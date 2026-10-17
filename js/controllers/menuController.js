// CONTROLADOR: abre y cierra el menú en celular.
const boton = document.getElementById("menu-boton");
const menu = document.getElementById("menu-principal");

boton.addEventListener("click", () => {
  const abierto = menu.classList.toggle("menu--abierto");
  boton.setAttribute("aria-expanded", abierto);
  boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
});
