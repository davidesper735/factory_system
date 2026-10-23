// VISTA (JS) del panel: construye la tabla con el DOM y actualiza la interfaz.
// No contiene reglas de negocio ni usa localStorage.
import { porId, crearElemento, crearIcono, rellenarCampos } from "../utils/dom.js";
import { buscarEstado } from "../data/estados.js";
import { formatearCedula, formatearFecha, formatearCosto, formatearTelefonoCompleto, formatearHora, fechaHoraActualIso } from "../utils/formato.js";
import { abrirConfirmacion, mostrarError } from "./formularioView.js";
export { mostrarMensaje, cerrarConfirmacion } from "./formularioView.js";

export const elementos = {
  buscador: porId("buscador"),
  filtroEstado: porId("filtro-estado"),
  cuerpoTabla: porId("cuerpo-tabla"),
  sinResultados: porId("sin-resultados"),
  confirmarAceptar: porId("confirmar-aceptar"),
  confirmarCancelar: porId("confirmar-cancelar"),
  dialogoAviso: porId("dialogo-aviso"),
  avisoMensaje: porId("aviso-mensaje"),
  avisoEnviar: porId("aviso-enviar"),
  avisoCancelar: porId("aviso-cancelar"),
};

// ----- Tabla de órdenes (se construye fila por fila) -----
function crearCelda(clase, texto) {
  return crearElemento("td", clase, texto);
}

function crearCeldaConDosLineas(clase, primeraLinea, segundaClase, segundaLinea) {
  const celda = crearElemento("td", clase);
  celda.append(crearElemento("span", "nombre", primeraLinea), crearElemento("span", segundaClase, segundaLinea));
  return celda;
}

function crearCeldaDeEstado(claveEstado) {
  const celda = crearElemento("td", "c-estado");
  celda.append(crearElemento("span", "insignia insignia--" + claveEstado, buscarEstado(claveEstado).texto));
  return celda;
}

function crearBotonDeAccion(accion, texto, icono) {
  const boton = crearElemento("button", "accion accion--" + accion);
  boton.type = "button";
  boton.dataset.accion = accion;
  if (icono) boton.append(crearIcono(icono));
  boton.append(texto);
  return boton;
}

function crearCeldaDeAcciones() {
  const celda = crearElemento("td", "c-acciones");
  celda.append(
    crearBotonDeAccion("editar", "Editar"),
    crearBotonDeAccion("eliminar", "Eliminar"),
    crearBotonDeAccion("aviso", "Enviar aviso", "whatsapp")
  );
  return celda;
}

function crearFila(orden, esActiva) {
  const fila = crearElemento("tr", esActiva ? "fila fila--activa" : "fila");
  fila.dataset.numero = orden.numero;
  fila.append(
    crearCelda("c-orden", "#" + orden.numero),
    crearCeldaConDosLineas("c-cliente", orden.nombre, "cedula solo-escritorio", formatearCedula(orden.cedula)),
    crearCeldaConDosLineas("c-equipo", orden.marca + " " + orden.modelo, "tipo", orden.tipo),
    crearCeldaDeEstado(orden.estado),
    crearCelda("c-ingreso", formatearFecha(orden.fechaIngreso)),
    crearCelda("c-costo", formatearCosto(orden.costo)),
    crearCelda("c-tecnico", orden.tecnico),
    crearCeldaDeAcciones()
  );
  return fila;
}

export function renderizarTabla(ordenes, numeroActivo) {
  const filas = ordenes.map((orden) => crearFila(orden, orden.numero === numeroActivo));
  elementos.cuerpoTabla.replaceChildren(...filas);
}

export function seleccionarFila(fila) {
  elementos.cuerpoTabla.querySelectorAll(".fila--activa").forEach((activa) => activa.classList.remove("fila--activa"));
  fila.classList.add("fila--activa");
}

export function leerNumeroDeFila(fila) {
  return Number(fila.dataset.numero);
}

export function obtenerFiltros() {
  return { texto: elementos.buscador.value, estado: elementos.filtroEstado.value };
}

// ----- Totales, contadores por estado y mensaje de "sin resultados" -----
export function actualizarResumen(cantidadVisible, cantidadTotal, conteoPorEstado) {
  document.querySelectorAll("[data-visibles]").forEach((elemento) => (elemento.textContent = cantidadVisible));
  document.querySelectorAll("[data-total]").forEach((elemento) => (elemento.textContent = cantidadTotal));
  document.querySelectorAll("[data-contador]").forEach((elemento) => {
    elemento.textContent = String(conteoPorEstado[elemento.dataset.contador]).padStart(2, "0");
  });
  rellenarCampos({ hora: formatearHora(fechaHoraActualIso()) });
  elementos.sinResultados.hidden = cantidadVisible > 0;
  elementos.sinResultados.textContent = cantidadTotal === 0 ? "Aún no hay órdenes registradas." : "No hay órdenes que coincidan con la búsqueda.";
}

// ----- Ventana para confirmar que se elimina una orden -----
export function abrirConfirmacionEliminar(orden, titulo, texto) {
  porId("confirmar-cliente").textContent = orden.nombre;
  porId("confirmar-equipo").textContent = orden.marca + " " + orden.modelo + " · " + orden.tipo;
  porId("confirmar-detalle").textContent = "Cédula " + formatearCedula(orden.cedula) + " · Ingreso " + formatearFecha(orden.fechaIngreso);
  const estado = buscarEstado(orden.estado);
  porId("confirmar-estado").textContent = estado.texto;
  porId("confirmar-estado").className = "insignia insignia--" + estado.clave;
  porId("confirmar-costo").textContent = formatearCosto(orden.costo);
  abrirConfirmacion(titulo, texto, "Eliminar", true);
}

// ----- Ventana de aviso por WhatsApp -----
export function abrirAviso(orden, mensaje) {
  const estado = buscarEstado(orden.estado);
  porId("aviso-cliente").textContent = orden.nombre;
  porId("aviso-telefono").textContent = formatearTelefonoCompleto(orden.telefono);
  porId("aviso-orden").textContent = "Orden #" + orden.numero;
  porId("aviso-estado").textContent = estado.texto;
  porId("aviso-estado").className = "insignia insignia--" + estado.clave;
  porId("aviso-ayuda").textContent = "Mensaje sugerido según el estado actual: " + estado.texto + ".";
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

export function mostrarResultadoAviso(orden) {
  porId("aviso-resultado").textContent = "Aviso enviado a " + orden.nombre + " (" + formatearTelefonoCompleto(orden.telefono) + ").";
  elementos.avisoEnviar.disabled = true;
  elementos.avisoCancelar.textContent = "Cerrar";
}

export function cerrarAviso() {
  elementos.dialogoAviso.close();
}
