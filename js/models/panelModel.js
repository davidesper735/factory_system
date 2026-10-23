// MODELO DEL PANEL: filtrar, contar y preparar mensajes. No toca el HTML.
import { ESTADOS } from "../data/estados.js";
import { formatearCosto } from "../utils/formato.js";

function coincideConElTexto(orden, textoBuscado) {
  const contenido = "#" + orden.numero + " " + orden.nombre + " " + orden.cedula;
  return contenido.toLowerCase().includes(textoBuscado);
}

// Devuelve solo las órdenes que cumplen la búsqueda y el estado elegido
export function filtrarOrdenes(ordenes, texto, estado) {
  const textoBuscado = texto.trim().toLowerCase().replace(/\./g, "");
  return ordenes.filter((orden) => {
    return coincideConElTexto(orden, textoBuscado) && (estado === "todos" || orden.estado === estado);
  });
}

// Devuelve cuántas órdenes hay en cada estado: { recibido: 2, diagnostico: 1, ... }
export function contarPorEstado(ordenes) {
  const conteo = {};
  ESTADOS.forEach((estado) => (conteo[estado.clave] = 0));
  ordenes.forEach((orden) => conteo[orden.estado]++);
  return conteo;
}

// Mensaje de WhatsApp sugerido según el estado de la orden
export function mensajeSugerido(orden) {
  const nombre = orden.nombre.split(" ")[0];
  const equipo = orden.marca + " " + orden.modelo;
  const cierre = "Orden #" + orden.numero + " · Factory System.";
  const costo = formatearCosto(orden.costo);
  const mensajes = {
    recibido: "Hola, " + nombre + ". Recibimos tu equipo " + equipo + ". Te avisaremos cuando iniciemos el diagnóstico. " + cierre,
    diagnostico: "Hola, " + nombre + ". Estamos revisando tu equipo " + equipo + " para encontrar la falla. Te avisaremos con el diagnóstico y el costo. " + cierre,
    reparacion: "Hola, " + nombre + ". Tu equipo " + equipo + " está en reparación. Ya iniciamos el trabajo. Costo: " + costo + ". Te avisaremos cuando esté listo. " + cierre,
    listo: "Hola, " + nombre + ". Tu equipo " + equipo + " ya está listo para recoger. Costo: " + costo + ". " + cierre,
    entregado: "Hola, " + nombre + ". Gracias por confiar en nosotros: tu equipo " + equipo + " fue entregado. " + cierre,
  };
  return mensajes[orden.estado];
}

// Devuelve el error del mensaje o "" si está bien
export function validarMensaje(texto) {
  if (texto.trim() === "") return "Escribe el mensaje antes de enviarlo.";
  if (texto.length > 500) return "El mensaje no puede pasar de 500 caracteres.";
  return "";
}
