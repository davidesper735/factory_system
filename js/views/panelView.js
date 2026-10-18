// VISTA (JS): lee y modifica el HTML del panel. Sin reglas de negocio.
import { abrirConfirmacion, mostrarError } from "./formularioView.js";
export { mostrarMensaje, cerrarConfirmacion } from "./formularioView.js";

const porId = (id) => document.getElementById(id);

export const elementos = {
  buscador: porId("buscador"),
  filtroEstado: porId("filtro-estado"),
  cuerpoTabla: porId("cuerpo-tabla"),
  filaVacia: porId("fila-vacia"),
  dialogoConfirmar: porId("dialogo-confirmar"),
  confirmarAceptar: porId("confirmar-aceptar"),
  confirmarCancelar: porId("confirmar-cancelar"),
  dialogoAviso: porId("dialogo-aviso"),
  avisoMensaje: porId("aviso-mensaje"),
  avisoEnviar: porId("aviso-enviar"),
  avisoCancelar: porId("aviso-cancelar"),
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
  const texto = (selector) => fila.querySelector(selector).textContent;
  return {
    numero: texto(".c-orden"),
    cliente: texto(".c-cliente .nombre"),
    cedula: texto(".c-cliente .cedula"),
    equipo: texto(".c-equipo .nombre"),
    tipo: texto(".c-equipo .tipo"),
    ingreso: texto(".c-ingreso"),
    costo: texto(".c-costo"),
    estadoClave: fila.dataset.estado,
    estadoTexto: texto(".c-estado .insignia"),
    telefono: fila.dataset.telefono || "",
    trabajo: fila.dataset.trabajo || "la reparación",
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

// ----- Ventana de confirmación con el resumen de la orden -----
export function abrirConfirmacionOrden(orden, titulo, texto, textoBoton, esPeligro) {
  porId("confirmar-cliente").textContent = orden.cliente;
  porId("confirmar-equipo").textContent = orden.equipo + " · " + orden.tipo;
  porId("confirmar-detalle").textContent = "Cédula " + orden.cedula + " · Ingreso " + orden.ingreso;
  porId("confirmar-estado").textContent = orden.estadoTexto;
  porId("confirmar-estado").className = "insignia insignia--" + orden.estadoClave;
  porId("confirmar-costo").textContent = orden.costo;

  porId("confirmar-icono").className = "dialogo__icono dialogo__icono--" + (esPeligro ? "peligro" : "aviso");
  porId("confirmar-icono-svg").setAttribute("href", "../img/iconos.svg#" + (esPeligro ? "papelera" : "whatsapp"));

  abrirConfirmacion(titulo, texto, textoBoton, esPeligro);
}

// ----- Ventana de aviso por WhatsApp -----
export function abrirAviso(orden, mensaje) {
  porId("aviso-cliente").textContent = orden.cliente;
  porId("aviso-telefono").textContent = orden.telefono;
  porId("aviso-orden").textContent = "Orden " + orden.numero;
  porId("aviso-estado").textContent = orden.estadoTexto;
  porId("aviso-estado").className = "insignia insignia--" + orden.estadoClave;
  porId("aviso-ayuda").textContent = "Mensaje sugerido según el estado actual: " + orden.estadoTexto + ".";
  elementos.avisoMensaje.value = mensaje;
  mostrarError("aviso-mensaje", "");
  porId("aviso-resultado").textContent = "";
  elementos.avisoEnviar.disabled = false;
  elementos.avisoCancelar.textContent = "Cancelar";
  elementos.dialogoAviso.showModal();
}
export function obtenerMensajeAviso() {
  return elementos.avisoMensaje.value;
}
export function mostrarErrorAviso(texto) {
  mostrarError("aviso-mensaje", texto);
}
export function mostrarResultadoAviso(texto) {
  porId("aviso-resultado").textContent = texto;
  elementos.avisoEnviar.disabled = true;
  elementos.avisoCancelar.textContent = "Cerrar";
}
export function cerrarAviso() {
  elementos.dialogoAviso.close();
}
