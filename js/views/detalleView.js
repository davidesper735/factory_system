// VISTA (JS) de "Detalle de la orden": muestra todos los datos de una orden.
import { porId, rellenarCampos, actualizarInsignias, agregarNumeroAEnlaces, mostrarContenidoDeOrden } from "../utils/dom.js";
import { buscarEstado } from "../data/estados.js";
import { formatearCedula, formatearTelefono, formatearFechaCorta, formatearCosto } from "../utils/formato.js";
import { renderizarPasos } from "./pasosView.js";
import { renderizarFotos } from "./fotosView.js";
export { mostrarOrdenNoEncontrada } from "../utils/dom.js";

function crearTextosDeCelular(orden) { // resumen que solo se ve en celular
  const costo = formatearCosto(orden.costo) + " COP";
  return {
    lineaEquipoMovil: orden.tipo + " · " + orden.marca + " · Modelo " + orden.modelo,
    clienteCedula: orden.nombre + " · C.C. " + formatearCedula(orden.cedula),
    telefonoMovil: "Teléfono: " + formatearTelefono(orden.telefono),
    ingresoTecnico: "Ingreso: " + formatearFechaCorta(orden.fechaIngreso) + " · Técnico: " + orden.tecnico,
    costoMovil: "Costo de reparación: " + costo,
  };
}

export function mostrarDetalle(datos) {
  const orden = datos.orden;
  document.title = "Detalle de la orden #" + orden.numero + " | Factory System";
  rellenarCampos({
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
    diagnostico: orden.diagnostico === "" ? "Pendiente de diagnóstico." : orden.diagnostico,
    autorDiagnostico: datos.autorDiagnostico,
    resumenFotos: datos.resumenFotos,
    notaHistorial: datos.notaHistorial,
    ...crearTextosDeCelular(orden),
  });
  actualizarInsignias(buscarEstado(orden.estado));
  agregarNumeroAEnlaces(orden.numero);
  renderizarFotos(porId("lista-fotos"), orden.evidencias);
  renderizarPasos(porId("lista-pasos"), datos.pasos, { conDetalle: true, etiquetaSoloMovil: false });
  mostrarContenidoDeOrden();
}
