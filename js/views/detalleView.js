// VISTA (JS) de "Detalle de la orden": muestra todos los datos de una orden.
import { porId, rellenarCampos, actualizarInsignias, agregarNumeroAEnlaces, mostrarContenidoDeOrden } from "../utils/dom.js";
import { buscarEstado } from "../data/estados.js";
import { formatearCedula, formatearTelefono, formatearFechaCorta, formatearCosto } from "../utils/formato.js";
import { renderizarPasos } from "./pasosView.js";
import { renderizarFotos } from "./fotosView.js";
export { mostrarOrdenNoEncontrada } from "../utils/dom.js";

// Textos del resumen que solo se ve en celular
function agregarTextosDeCelular(valores, orden) {
  valores.lineaEquipoMovil = orden.tipo + " · " + orden.marca + " · Modelo " + orden.modelo;
  valores.clienteCedula = orden.nombre + " · C.C. " + formatearCedula(orden.cedula);
  valores.telefonoMovil = "Teléfono: " + formatearTelefono(orden.telefono);
  valores.ingresoTecnico = "Ingreso: " + formatearFechaCorta(orden.fechaIngreso) + " · Técnico: " + orden.tecnico;
  valores.costoMovil = "Costo de reparación: " + formatearCosto(orden.costo) + " COP";
}

export function mostrarDetalle(datos) {
  const orden = datos.orden;
  let diagnostico = orden.diagnostico;
  if (diagnostico === "") {
    diagnostico = "Pendiente de diagnóstico.";
  }

  const valores = {
    numero: orden.numero,
    equipo: orden.marca + " " + orden.modelo,
    nombre: orden.nombre,
    cedula: formatearCedula(orden.cedula),
    telefono: formatearTelefono(orden.telefono),
    tipo: orden.tipo,
    marca: orden.marca,
    modelo: orden.modelo,
    fechaIngreso: formatearFechaCorta(orden.fechaIngreso),
    tecnico: orden.tecnico,
    costo: formatearCosto(orden.costo) + " COP",
    falla: orden.falla,
    diagnostico: diagnostico,
    autorDiagnostico: datos.autorDiagnostico,
    resumenFotos: datos.resumenFotos,
    notaHistorial: datos.notaHistorial,
  };
  agregarTextosDeCelular(valores, orden);

  document.title = "Detalle de la orden #" + orden.numero + " | Factory System";
  rellenarCampos(valores);
  actualizarInsignias(buscarEstado(orden.estado));
  agregarNumeroAEnlaces(orden.numero);
  renderizarFotos(porId("lista-fotos"), orden.evidencias);
  renderizarPasos(porId("lista-pasos"), datos.pasos, { conDetalle: true, etiquetaSoloMovil: false });
  mostrarContenidoDeOrden();
}
