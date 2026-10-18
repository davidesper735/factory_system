// VISTA compartida por los formularios de orden (nueva orden y editar orden).
import { mostrarError } from "./formularioView.js";
export { mostrarMensaje, abrirConfirmacion, cerrarConfirmacion } from "./formularioView.js";

const porId = (id) => document.getElementById(id);

// Campos que se validan (en el orden en que aparecen en la página)
const CAMPOS = ["nombre", "cedula", "telefono", "tipo", "marca", "modelo", "falla", "fecha", "costo"];
const TODOS = [...CAMPOS, "diagnostico", "estado", "tecnico"];

// Sección donde está cada campo (se indica en celular, donde las secciones quedan una bajo otra)
const SECCION = { tipo: "Equipo", marca: "Equipo", modelo: "Equipo", falla: "Equipo", fecha: "Gestión", costo: "Gestión" };

export function obtenerDatos() {
  const datos = {};
  TODOS.forEach((id) => (datos[id] = porId(id).value));
  return datos;
}

// Texto rojo bajo cada campo con error
export function mostrarErrores(errores) {
  CAMPOS.forEach((campo) => mostrarError(campo, errores[campo] ? errores[campo].mensaje : ""));
}

// Aviso rojo de arriba: "No se pudo guardar: corrige N campos" + lista corta
export function mostrarResumenErrores(errores) {
  const campos = CAMPOS.filter((campo) => errores[campo]);
  const lista = porId("alerta-lista");
  lista.replaceChildren();
  porId("alerta-errores").hidden = campos.length === 0;
  if (campos.length === 0) return;

  porId("alerta-titulo").textContent = "No se pudo guardar: corrige " + campos.length + (campos.length === 1 ? " campo" : " campos");
  campos.forEach((campo) => {
    const item = document.createElement("li");
    item.textContent = errores[campo].resumen;
    const extra = document.createElement("span"); // solo se ve en celular
    extra.className = "solo-movil";
    extra.textContent = (SECCION[campo] ? " (en " + SECCION[campo] + ")" : "") + ".";
    item.appendChild(extra);
    lista.appendChild(item);
  });
}

// Lleva el cursor al primer campo con error
export function enfocarPrimerError(errores) {
  const primero = CAMPOS.find((campo) => errores[campo]);
  if (primero) porId(primero).focus({ preventScroll: true });
}

export function mostrarErrorFotos(texto) {
  porId("error-fotos").textContent = texto;
}

export function irAlInicio() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
