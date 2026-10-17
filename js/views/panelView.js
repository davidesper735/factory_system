// VISTA (JS): lee y modifica el HTML del panel. Sin reglas de negocio.
export { mostrarMensaje, abrirConfirmacion, cerrarConfirmacion } from "./formularioView.js";

const porId = (id) => document.getElementById(id);

export const elementos = {
  buscador: porId("buscador"),
  filtroEstado: porId("filtro-estado"),
  cuerpoTabla: porId("cuerpo-tabla"),
  filaVacia: porId("fila-vacia"),
  dialogoConfirmar: porId("dialogo-confirmar"),
  confirmarAceptar: porId("confirmar-aceptar"),
  confirmarCancelar: porId("confirmar-cancelar"),
};

// ----- Filas de la tabla -----
export function obtenerFilas() {
  return [...elementos.cuerpoTabla.querySelectorAll(".fila")];
}
export function obtenerFiltros() {
  return { texto: elementos.buscador.value, estado: elementos.filtroEstado.value };
}
export function textoDeFila(fila) {
  return fila.querySelector(".c-orden").textContent + " " + fila.querySelector(".c-cliente").textContent;
}
export function estadoDeFila(fila) {
  return fila.dataset.estado;
}
export function mostrarFila(fila, visible) {
  fila.hidden = !visible;
}
export function leerFila(fila) {
  return {
    numero: fila.querySelector(".c-orden").textContent,
    cliente: fila.querySelector(".c-cliente .nombre").textContent,
  };
}
export function seleccionarFila(fila) {
  obtenerFilas().forEach((f) => f.classList.remove("fila--activa"));
  fila.classList.add("fila--activa");
}
export function eliminarFila(fila) {
  fila.remove();
}

// Actualiza los totales, los contadores por estado y el mensaje de "sin resultados"
export function actualizarResumen(visibles) {
  const filas = obtenerFilas();
  document.querySelectorAll("[data-visibles]").forEach((el) => (el.textContent = visibles));
  document.querySelectorAll("[data-total]").forEach((el) => (el.textContent = filas.length));
  document.querySelectorAll("[data-contador]").forEach((el) => {
    const cantidad = filas.filter((f) => estadoDeFila(f) === el.dataset.contador).length;
    el.textContent = String(cantidad).padStart(2, "0");
  });
  elementos.filaVacia.hidden = visibles > 0;
}
