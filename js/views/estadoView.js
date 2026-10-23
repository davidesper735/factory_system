// VISTA (JS) de "Estado de tu equipo": muestra los datos de una orden.
import { porId, rellenarCampos, actualizarInsignias, agregarNumeroAEnlaces, mostrarContenidoDeOrden } from "../utils/dom.js";
import { buscarEstado } from "../data/estados.js";
import { formatearCedula, formatearFecha, formatearFechaCorta, formatearHora, formatearCosto } from "../utils/formato.js";
import { renderizarPasos } from "./pasosView.js";
export { mostrarOrdenNoEncontrada } from "../utils/dom.js";

function crearLineaDeEstado(orden, fechaActualizacion) {
  return buscarEstado(orden.estado).texto + " · Actualizado el " + formatearFecha(fechaActualizacion) + " a las " + formatearHora(fechaActualizacion);
}

export function mostrarEstado(datos) {
  const orden = datos.orden;
  document.title = "Estado de tu equipo | Factory System";
  rellenarCampos({
    numero: orden.numero,
    primerNombre: orden.nombre.split(" ")[0],
    equipo: orden.marca + " " + orden.modelo,
    detalleEquipo: orden.tipo + " · " + orden.nombre + " · C.C. " + formatearCedula(orden.cedula),
    fechaIngreso: formatearFechaCorta(orden.fechaIngreso),
    tecnico: orden.tecnico,
    costo: formatearCosto(orden.costo) + " COP",
    notaActual: datos.notaActual,
    lineaEstado: crearLineaDeEstado(orden, datos.ultimaActualizacion),
    notaProgreso: datos.notaProgreso,
    avisoCliente: datos.avisoCliente,
  });
  actualizarInsignias(buscarEstado(orden.estado));
  agregarNumeroAEnlaces(orden.numero);
  renderizarPasos(porId("lista-pasos"), datos.pasos, { conDetalle: false, etiquetaSoloMovil: true });
  mostrarContenidoDeOrden();
}
