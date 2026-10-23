// CONTROLADOR del panel: READ (listado y buscador) y DELETE del CRUD.
import { obtenerOrdenes, buscarOrdenPorNumero, eliminarOrden } from "../models/ordenesModel.js";
import { filtrarOrdenes, contarPorEstado, mensajeSugerido, validarMensaje } from "../models/panelModel.js";
import { leerParametro } from "../utils/url.js";
import * as vista from "../views/panelView.js";

let numeroActivo = null;    // orden resaltada en la tabla
let ordenPendiente = null;  // orden a la que se le va a eliminar o enviar aviso

// Vuelve a dibujar la tabla con las órdenes que cumplen los filtros
function refrescarListado() {
  const todas = obtenerOrdenes();
  const filtros = vista.obtenerFiltros();
  const visibles = filtrarOrdenes(todas, filtros.texto, filtros.estado);
  vista.renderizarTabla(visibles, numeroActivo);
  vista.actualizarResumen(visibles.length, todas.length, contarPorEstado(todas));
}

function iniciarAccion(accion, orden) {
  ordenPendiente = orden;
  if (accion === "eliminar") {
    vista.abrirConfirmacionEliminar(orden, "¿Eliminar la orden #" + orden.numero + "?", "Esta acción eliminará la orden, su historial y sus fotos. No podrás recuperarla.");
  } else {
    vista.abrirAviso(orden, mensajeSugerido(orden));
  }
}

// Un solo "click" en la tabla sirve para todas las filas y botones
function clicEnTabla(evento) {
  const fila = evento.target.closest(".fila");
  if (!fila) return;
  numeroActivo = vista.leerNumeroDeFila(fila);
  vista.seleccionarFila(fila);

  const boton = evento.target.closest("[data-accion]");
  if (!boton) return;

  const accion = boton.dataset.accion;
  if (accion === "editar") {
    window.location.href = "editar-orden.html?orden=" + numeroActivo;
    return;
  }
  iniciarAccion(accion, buscarOrdenPorNumero(numeroActivo));
}

function confirmarEliminar() {
  eliminarOrden(ordenPendiente.numero);
  vista.cerrarConfirmacion();
  vista.mostrarMensaje("Orden #" + ordenPendiente.numero + " eliminada.", "exito");
  ordenPendiente = null;
  refrescarListado();
}

function enviarAviso() {
  const error = validarMensaje(vista.obtenerMensajeAviso());
  vista.mostrarErrorAviso(error);
  if (error !== "") return; // el mensaje no es válido: no se envía
  vista.mostrarResultadoAviso(ordenPendiente);
}

// Mensaje cuando se llega desde "nueva orden" o "editar orden"
function mostrarMensajeDeRedireccion() {
  const creada = leerParametro("creada");
  const editada = leerParametro("editada");
  if (creada) vista.mostrarMensaje("Orden #" + creada + " creada correctamente.", "exito");
  if (editada) vista.mostrarMensaje("Orden #" + editada + " actualizada correctamente.", "exito");
  if (creada || editada) window.history.replaceState(null, "", "ordenes.html"); // para que no se repita al recargar
}

function configurarEventos() {
  const el = vista.elementos;
  el.buscador.addEventListener("input", refrescarListado); // filtra mientras se escribe
  el.filtroEstado.addEventListener("change", refrescarListado);
  el.cuerpoTabla.addEventListener("click", clicEnTabla);

  el.confirmarAceptar.addEventListener("click", confirmarEliminar);
  el.confirmarCancelar.addEventListener("click", vista.cerrarConfirmacion);
  el.avisoEnviar.addEventListener("click", enviarAviso);
  el.avisoCancelar.addEventListener("click", vista.cerrarAviso);
}

function iniciar() {
  configurarEventos();
  refrescarListado();
  mostrarMensajeDeRedireccion();
}

iniciar();
