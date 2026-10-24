// MODELO DEL PANEL: filtrar, contar y preparar mensajes. No toca el HTML.
import { ESTADOS } from "../data/estados.js";
import { formatearCosto } from "../utils/formato.js";

// ¿El texto buscado aparece en el número, el nombre o la cédula de la orden?
function coincideConElTexto(orden, textoBuscado) {
  const contenido = "#" + orden.numero + " " + orden.nombre + " " + orden.cedula;
  return contenido.toLowerCase().includes(textoBuscado);
}

// Devuelve solo las órdenes que cumplen la búsqueda y el estado elegido
export function filtrarOrdenes(ordenes, texto, estado) {
  const textoBuscado = texto.trim().toLowerCase().replace(/\./g, "");
  const resultado = [];
  for (const orden of ordenes) {
    const cumpleTexto = coincideConElTexto(orden, textoBuscado);
    const cumpleEstado = estado === "todos" || orden.estado === estado;
    if (cumpleTexto && cumpleEstado) {
      resultado.push(orden);
    }
  }
  return resultado;
}

// Devuelve cuántas órdenes hay en cada estado. Ejemplo: { recibido: 2, diagnostico: 1, ... }
export function contarPorEstado(ordenes) {
  const conteo = {};
  for (const estado of ESTADOS) {
    conteo[estado.clave] = 0;
  }
  for (const orden of ordenes) {
    conteo[orden.estado] = conteo[orden.estado] + 1;
  }
  return conteo;
}

// Mensaje de WhatsApp sugerido según el estado de la orden
export function mensajeSugerido(orden) {
  const nombre = orden.nombre.split(" ")[0];
  const equipo = orden.marca + " " + orden.modelo;
  const cierre = "Orden #" + orden.numero + " · Factory System.";
  const saludo = "Hola, " + nombre + ". ";

  if (orden.estado === "recibido") {
    return saludo + "Recibimos tu equipo " + equipo + ". Te avisaremos cuando iniciemos el diagnóstico. " + cierre;
  }
  if (orden.estado === "diagnostico") {
    return saludo + "Estamos revisando tu equipo " + equipo + " para encontrar la falla. Te avisaremos con el diagnóstico y el costo. " + cierre;
  }
  if (orden.estado === "reparacion") {
    return saludo + "Tu equipo " + equipo + " está en reparación. Ya iniciamos el trabajo. Costo: " + formatearCosto(orden.costo) + ". Te avisaremos cuando esté listo. " + cierre;
  }
  if (orden.estado === "listo") {
    return saludo + "Tu equipo " + equipo + " ya está listo para recoger. Costo: " + formatearCosto(orden.costo) + ". " + cierre;
  }
  return saludo + "Gracias por confiar en nosotros: tu equipo " + equipo + " fue entregado. " + cierre;
}

// Devuelve el error del mensaje o "" si está bien
export function validarMensaje(texto) {
  if (texto.trim() === "") {
    return "Escribe el mensaje antes de enviarlo.";
  }
  if (texto.length > 500) {
    return "El mensaje no puede pasar de 500 caracteres.";
  }
  return "";
}
