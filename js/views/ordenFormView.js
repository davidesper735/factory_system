// VISTA compartida por los formularios de orden (nueva orden y editar orden).
import { porId } from "../utils/dom.js";
import { formatearCedula, formatearTelefono, formatearCosto, formatearFechaCorta, fechaDeHoyIso } from "../utils/formato.js";
import { mostrarError } from "./formularioView.js";
export { mostrarMensaje, abrirConfirmacion, cerrarConfirmacion } from "./formularioView.js";

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

// Escribe en el formulario los datos de una orden (para editarla)
export function rellenarFormulario(orden) {
  const valores = {
    nombre: orden.nombre,
    cedula: formatearCedula(orden.cedula),
    telefono: formatearTelefono(orden.telefono),
    tipo: orden.tipo,
    marca: orden.marca,
    modelo: orden.modelo,
    falla: orden.falla,
    diagnostico: orden.diagnostico,
    estado: orden.estado,
    fecha: formatearFechaCorta(orden.fechaIngreso),
    tecnico: orden.tecnico,
    costo: formatearCosto(orden.costo),
  };
  Object.entries(valores).forEach(([id, valor]) => (porId(id).value = valor));
}

export function establecerFechaDeHoy() {
  porId("fecha").value = formatearFechaCorta(fechaDeHoyIso());
}

// Texto rojo bajo cada campo con error
export function mostrarErrores(errores) {
  CAMPOS.forEach((campo) => mostrarError(campo, errores[campo] ? errores[campo].mensaje : ""));
}

function crearItemDeError(campo, error) {
  const item = document.createElement("li");
  item.textContent = error.resumen;
  const extra = document.createElement("span"); // solo se ve en celular
  extra.className = "solo-movil";
  extra.textContent = (SECCION[campo] ? " (en " + SECCION[campo] + ")" : "") + ".";
  item.append(extra);
  return item;
}

// Aviso rojo de arriba: "No se pudo guardar: corrige N campos" + lista corta
export function mostrarResumenErrores(errores) {
  const campos = CAMPOS.filter((campo) => errores[campo]);
  porId("alerta-errores").hidden = campos.length === 0;
  porId("alerta-lista").replaceChildren(...campos.map((campo) => crearItemDeError(campo, errores[campo])));
  if (campos.length === 0) return;
  porId("alerta-titulo").textContent = "No se pudo guardar: corrige " + campos.length + (campos.length === 1 ? " campo" : " campos");
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
