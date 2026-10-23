// CONTROLADOR de editar orden: READ de una orden y UPDATE del CRUD.
import { buscarOrdenPorNumero, actualizarOrden } from "../models/ordenesModel.js";
import { normalizarDatosFormulario, construirEvidencias, validarFotos, resumirEvidencias } from "../models/ordenFormModel.js";
import { leerParametro } from "../utils/url.js";
import * as vista from "../views/editarOrdenView.js";
import { validarFormularioOrden } from "./validacionOrden.js";

const numeroDeOrden = Number(leerParametro("orden")); // viene en la dirección: editar-orden.html?orden=123

function guardar(evento) {
  evento.preventDefault(); // evita que la página se recargue
  if (!validarFormularioOrden(vista)) return;

  const datos = normalizarDatosFormulario(vista.obtenerDatos());
  const evidenciasNuevas = construirEvidencias(vista.elementos.fotos.files);
  actualizarOrden(numeroDeOrden, datos, evidenciasNuevas);
  window.location.href = "ordenes.html?editada=" + numeroDeOrden;
}

function revisarFotos(archivos) {
  vista.mostrarErrorFotos(validarFotos(archivos));
  vista.mostrarFotosNuevas(archivos);
}

function configurarEventos() {
  const el = vista.elementos;
  el.formulario.addEventListener("submit", guardar);

  // "Subir más fotos" abre el selector de archivos
  el.botonSubir.addEventListener("click", () => el.fotos.click());
  el.fotos.addEventListener("change", () => revisarFotos(el.fotos.files));

  // Cancelar pide confirmación antes de salir
  el.botonCancelar.addEventListener("click", () => {
    vista.abrirConfirmacion("Descartar cambios", "Los cambios que hiciste no se guardarán. ¿Quieres salir?", "Sí, descartar", true);
  });
  el.confirmarAceptar.addEventListener("click", () => (window.location.href = "ordenes.html"));
  el.confirmarCancelar.addEventListener("click", vista.cerrarConfirmacion);
}

function iniciar() {
  const orden = buscarOrdenPorNumero(numeroDeOrden);
  if (orden === null) {
    vista.mostrarOrdenNoEncontrada();
    return;
  }
  vista.mostrarOrden(orden, resumirEvidencias(orden.evidencias));
  configurarEventos();
}

iniciar();
