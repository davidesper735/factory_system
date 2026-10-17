// VISTA compartida por los formularios de orden (nueva orden y editar orden).
import { mostrarError } from "./formularioView.js";
export { mostrarMensaje, abrirConfirmacion, cerrarConfirmacion } from "./formularioView.js";

const porId = (id) => document.getElementById(id);

// Campos que se validan (en el orden en que aparecen en la página)
const CAMPOS = ["nombre", "cedula", "telefono", "tipo", "marca", "modelo", "falla", "fecha", "costo"];
const TODOS = [...CAMPOS, "diagnostico", "estado", "tecnico"];

export function obtenerDatos() {
  const datos = {};
  TODOS.forEach((id) => (datos[id] = porId(id).value));
  return datos;
}

export function mostrarErrores(errores) {
  CAMPOS.forEach((campo) => mostrarError(campo, errores[campo]));
}

// Lleva el cursor al primer campo con error (la página se desplaza sola hasta él)
export function enfocarPrimerError(errores) {
  const primero = CAMPOS.find((campo) => errores[campo]);
  if (primero) porId(primero).focus();
}

export function mostrarErrorFotos(texto) {
  porId("error-fotos").textContent = texto;
}

export function irAlInicio() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
