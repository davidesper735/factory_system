// VISTA (JS): lee y modifica el HTML de las pantallas del cliente.
export { mostrarMensaje } from "./formularioView.js";

export const elementos = {
  botones: document.querySelectorAll("[data-accion]"),
};

export function irAlInicio() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
