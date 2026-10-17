// VISTA (JS): lee y modifica el HTML de la consulta. Sin reglas de negocio.
import { mostrarError } from "./formularioView.js";
export { mostrarMensaje } from "./formularioView.js";

export const elementos = {
  formulario: document.getElementById("form-consulta"),
  cedula: document.getElementById("cedula"),
  orden: document.getElementById("orden"),
};

export function obtenerDatos() {
  return { cedula: elementos.cedula.value, orden: elementos.orden.value };
}

export function mostrarErrores(errores) {
  mostrarError("cedula", errores.cedula);
  mostrarError("orden", errores.orden);
}
