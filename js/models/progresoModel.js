// MODELO DE PROGRESO: a partir de una orden calcula los pasos del historial
// y los textos que se le muestran al cliente. No toca el HTML.
import { ESTADOS, indiceDeEstado } from "../data/estados.js";
import { formatearFecha } from "../utils/formato.js";

function buscarUltimoRegistro(orden, claveEstado) {
  const registros = orden.historial.filter((registro) => registro.estado === claveEstado);
  return registros.length > 0 ? registros[registros.length - 1] : null;
}

function calcularSituacion(indicePaso, indiceActual) {
  if (indicePaso < indiceActual) return "completado";
  return indicePaso === indiceActual ? "actual" : "pendiente";
}

// Devuelve los 5 pasos: completado, actual o pendiente
export function construirPasos(orden) {
  const indiceActual = orden.estado === "entregado" ? ESTADOS.length : indiceDeEstado(orden.estado);
  return ESTADOS.map((estado, indice) => {
    const registro = buscarUltimoRegistro(orden, estado.clave);
    return {
      numero: indice + 1,
      clave: estado.clave,
      texto: estado.texto,
      situacion: calcularSituacion(indice, indiceActual),
      fecha: registro ? registro.fecha : "",
      nota: registro && registro.nota ? registro.nota : estado.nota,
    };
  });
}

export function ultimaActualizacion(orden) {
  return orden.historial[orden.historial.length - 1].fecha;
}

export function notaDelEstadoActual(orden) {
  const pasoActual = construirPasos(orden).find((paso) => paso.situacion === "actual");
  return pasoActual ? pasoActual.nota : "Tu equipo ya fue entregado.";
}

function obtenerPendientes(orden) {
  return construirPasos(orden).filter((paso) => paso.situacion === "pendiente");
}

function unirNombres(pasos) { // "Listo y Entregado"
  const nombres = pasos.map((paso) => paso.texto);
  if (nombres.length <= 1) return nombres.join("");
  return nombres.slice(0, -1).join(", ") + " y " + nombres[nombres.length - 1];
}

export function notaDeProgresoCliente(orden) {
  const pendientes = obtenerPendientes(orden);
  if (pendientes.length === 0) return "Tu equipo ya fue entregado. ¡Gracias por confiar en nosotros!";
  const verbo = pendientes.length === 1 ? "está pendiente" : "están pendientes";
  const cierre = orden.estado === "listo" ? "Puedes pasar por tu equipo al taller." : "Te avisaremos cuando tu equipo esté listo para recoger.";
  return unirNombres(pendientes) + " " + verbo + ". " + cierre;
}

export function notaDeHistorial(orden) {
  const pendientes = obtenerPendientes(orden);
  if (pendientes.length === 0) return "La orden está completa: el equipo fue entregado.";
  const verbo = pendientes.length === 1 ? "sigue pendiente" : "siguen pendientes";
  return unirNombres(pendientes) + " " + verbo + ". Se avisará al cliente cuando finalice la reparación.";
}

export function avisoParaCliente(orden) {
  if (orden.estado === "entregado") return "Tu equipo ya fue entregado.";
  if (orden.estado === "listo") return "¡Tu equipo está listo! Puedes pasar a recogerlo al taller.";
  return "Tu equipo aún no está listo para entrega. No necesitas acudir al taller todavía.";
}

export function textoAutorDiagnostico(orden) {
  const registro = buscarUltimoRegistro(orden, "diagnostico");
  if (orden.diagnostico === "" || registro === null) return "";
  return orden.tecnico + " · Diagnóstico registrado el " + formatearFecha(registro.fecha);
}
