// VISTA compartida por los formularios de orden (nueva orden y editar orden).
import { porId, crearElemento, vaciar } from "../utils/dom.js";
import { formatearCedula, formatearTelefono, formatearCosto, formatearFechaCorta, fechaDeHoyIso } from "../utils/formato.js";
import { mostrarError } from "./formularioView.js";
export { mostrarMensaje, abrirConfirmacion, cerrarConfirmacion } from "./formularioView.js";

// Campos que se validan, en el orden en que aparecen en la página
const CAMPOS = ["nombre", "cedula", "telefono", "tipo", "marca", "modelo", "falla", "fecha", "costo"];
const TODOS = ["nombre", "cedula", "telefono", "tipo", "marca", "modelo", "falla", "diagnostico", "estado", "fecha", "tecnico", "costo"];

// Sección donde está cada campo (se indica en celular, donde las secciones quedan una bajo otra)
const SECCION = { tipo: "Equipo", marca: "Equipo", modelo: "Equipo", falla: "Equipo", fecha: "Gestión", costo: "Gestión" };

// Lee lo que hay escrito en el formulario
export function obtenerDatos() {
  const datos = {};
  for (const id of TODOS) {
    datos[id] = porId(id).value;
  }
  return datos;
}

// Escribe en el formulario los datos de una orden (para editarla)
export function rellenarFormulario(orden) {
  porId("nombre").value = orden.nombre;
  porId("cedula").value = formatearCedula(orden.cedula);
  porId("telefono").value = formatearTelefono(orden.telefono);
  porId("tipo").value = orden.tipo;
  porId("marca").value = orden.marca;
  porId("modelo").value = orden.modelo;
  porId("falla").value = orden.falla;
  porId("diagnostico").value = orden.diagnostico;
  porId("estado").value = orden.estado;
  porId("fecha").value = formatearFechaCorta(orden.fechaIngreso);
  porId("tecnico").value = orden.tecnico;
  porId("costo").value = formatearCosto(orden.costo);
}

export function establecerFechaDeHoy() {
  porId("fecha").value = formatearFechaCorta(fechaDeHoyIso());
}

// Muestra el texto rojo bajo cada campo con error (y lo borra en los que están bien)
export function mostrarErrores(errores) {
  for (const campo of CAMPOS) {
    if (errores[campo]) {
      mostrarError(campo, errores[campo].mensaje);
    } else {
      mostrarError(campo, "");
    }
  }
}

function crearItemDeError(campo, error) {
  const item = crearElemento("li", "", error.resumen);
  let textoExtra = ".";
  if (SECCION[campo]) {
    textoExtra = " (en " + SECCION[campo] + ").";
  }
  item.appendChild(crearElemento("span", "solo-movil", textoExtra)); // este texto solo se ve en celular
  return item;
}

// Aviso rojo de arriba: "No se pudo guardar: corrige N campos" + lista corta
export function mostrarResumenErrores(errores) {
  const lista = porId("alerta-lista");
  vaciar(lista);
  let cantidad = 0;
  for (const campo of CAMPOS) {
    if (errores[campo]) {
      lista.appendChild(crearItemDeError(campo, errores[campo]));
      cantidad = cantidad + 1;
    }
  }
  porId("alerta-errores").hidden = cantidad === 0;
  if (cantidad === 1) {
    porId("alerta-titulo").textContent = "No se pudo guardar: corrige 1 campo";
  } else {
    porId("alerta-titulo").textContent = "No se pudo guardar: corrige " + cantidad + " campos";
  }
}

// Lleva el cursor al primer campo con error
export function enfocarPrimerError(errores) {
  for (const campo of CAMPOS) {
    if (errores[campo]) {
      porId(campo).focus({ preventScroll: true });
      return;
    }
  }
}

export function mostrarErrorFotos(texto) {
  porId("error-fotos").textContent = texto;
}

export function irAlInicio() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
