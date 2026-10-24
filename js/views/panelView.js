// VISTA (JS) del panel: construye la tabla con el DOM y actualiza la interfaz.
// No contiene reglas de negocio ni usa localStorage.
import { porId, crearElemento, crearIcono, rellenarCampos, vaciar } from "../utils/dom.js";
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

// ----- Tabla de órdenes: se construye celda por celda con el DOM -----
function crearCelda(clase, texto) {
  return crearElemento("td", clase, texto);
}

function crearCeldaConDosLineas(clase, primeraLinea, segundaClase, segundaLinea) {
  const celda = crearElemento("td", clase);
  celda.appendChild(crearElemento("span", "nombre", primeraLinea));
  celda.appendChild(crearElemento("span", segundaClase, segundaLinea));
  return celda;
}

function crearCeldaDeEstado(claveEstado) {
  const celda = crearElemento("td", "c-estado");
  const texto = buscarEstado(claveEstado).texto;
  celda.appendChild(crearElemento("span", "insignia insignia--" + claveEstado, texto));
  return celda;
}

function crearBotonDeAccion(accion, texto, icono) {
  const boton = crearElemento("button", "accion accion--" + accion);
  boton.type = "button";
  boton.dataset.accion = accion;
  if (icono) {
    boton.appendChild(crearIcono(icono));
  }
  boton.appendChild(document.createTextNode(texto));
  return boton;
}

function crearCeldaDeAcciones() {
  const celda = crearElemento("td", "c-acciones");
  celda.appendChild(crearBotonDeAccion("editar", "Editar"));
  celda.appendChild(crearBotonDeAccion("eliminar", "Eliminar"));
  celda.appendChild(crearBotonDeAccion("aviso", "Enviar aviso", "whatsapp"));
  return celda;
}

function crearFila(orden, esActiva) {
  let clase = "fila";
  if (esActiva) {
    clase = "fila fila--activa";
  }
  const fila = crearElemento("tr", clase);
  fila.dataset.numero = orden.numero;
  fila.appendChild(crearCelda("c-orden", "#" + orden.numero));
  fila.appendChild(crearCeldaConDosLineas("c-cliente", orden.nombre, "cedula solo-escritorio", formatearCedula(orden.cedula)));
  fila.appendChild(crearCeldaConDosLineas("c-equipo", orden.marca + " " + orden.modelo, "tipo", orden.tipo));
  fila.appendChild(crearCeldaDeEstado(orden.estado));
  fila.appendChild(crearCelda("c-ingreso", formatearFecha(orden.fechaIngreso)));
  fila.appendChild(crearCelda("c-costo", formatearCosto(orden.costo)));
  fila.appendChild(crearCelda("c-tecnico", orden.tecnico));
  fila.appendChild(crearCeldaDeAcciones());
  return fila;
}

// Borra las filas que había y dibuja una fila por cada orden
export function renderizarTabla(ordenes, numeroActivo) {
  vaciar(elementos.cuerpoTabla);
  for (const orden of ordenes) {
    const esActiva = orden.numero === numeroActivo;
    elementos.cuerpoTabla.appendChild(crearFila(orden, esActiva));
  }
}

export function seleccionarFila(fila) {
  const activas = elementos.cuerpoTabla.querySelectorAll(".fila--activa");
  for (const activa of activas) {
    activa.classList.remove("fila--activa");
  }
  fila.classList.add("fila--activa");
}

export function leerNumeroDeFila(fila) {
  return Number(fila.dataset.numero);
}

export function obtenerFiltros() {
  return { texto: elementos.buscador.value, estado: elementos.filtroEstado.value };
}

// ----- Totales, contadores por estado y mensaje de "sin resultados" -----
function escribirEnTodos(selector, texto) {
  const lista = document.querySelectorAll(selector);
  for (const elemento of lista) {
    elemento.textContent = texto;
  }
}

function actualizarContadores(conteoPorEstado) {
  const contadores = document.querySelectorAll("[data-contador]");
  for (const contador of contadores) {
    const cantidad = conteoPorEstado[contador.dataset.contador];
    contador.textContent = String(cantidad).padStart(2, "0");
  }
}

export function actualizarResumen(cantidadVisible, cantidadTotal, conteoPorEstado) {
  escribirEnTodos("[data-visibles]", cantidadVisible);
  escribirEnTodos("[data-total]", cantidadTotal);
  actualizarContadores(conteoPorEstado);
  rellenarCampos({ hora: formatearHora(fechaHoraActualIso()) });

  if (cantidadTotal === 0) {
    elementos.sinResultados.textContent = "Aún no hay órdenes registradas.";
  } else {
    elementos.sinResultados.textContent = "No hay órdenes que coincidan con la búsqueda.";
  }
  elementos.sinResultados.hidden = cantidadVisible > 0;
}

// ----- Ventana para confirmar que se elimina una orden -----
export function abrirConfirmacionEliminar(orden, titulo, texto) {
  const estado = buscarEstado(orden.estado);
  porId("confirmar-cliente").textContent = orden.nombre;
  porId("confirmar-equipo").textContent = orden.marca + " " + orden.modelo + " · " + orden.tipo;
  porId("confirmar-detalle").textContent = "Cédula " + formatearCedula(orden.cedula) + " · Ingreso " + formatearFecha(orden.fechaIngreso);
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
