// CONTROLADOR de editar orden: READ de una orden y UPDATE del CRUD.
import { buscarOrdenPorNumero, actualizarOrden } from "../models/ordenesModel.js";
import { normalizarDatosFormulario, construirEvidencias, validarFotos, resumirEvidencias } from "../models/ordenFormModel.js";
import { leerParametro } from "../utils/url.js";
import * as vista from "../views/editarOrdenView.js";
import { validarFormularioOrden } from "./validacionOrden.js";

// El número viene en la dirección de la página: editar-orden.html?orden=123
const numeroDeOrden = Number(leerParametro("orden"));

// Se ejecuta cuando se pulsa "Guardar"
function guardar(evento) {
  evento.preventDefault(); // evita que la página se recargue
  if (validarFormularioOrden(vista) === false) {
    return; // hay errores: no se guarda
  }
  const datos = normalizarDatosFormulario(vista.obtenerDatos());
  const evidenciasNuevas = construirEvidencias(vista.elementos.fotos.files);
  actualizarOrden(numeroDeOrden, datos, evidenciasNuevas);
  window.location.href = "ordenes.html?editada=" + numeroDeOrden; // va al panel
}

// ----- Fotos -----
function abrirSelectorDeFotos() {
  vista.elementos.fotos.click();
}

function alCambiarFotos() {
  const archivos = vista.elementos.fotos.files;
  vista.mostrarErrorFotos(validarFotos(archivos));
  vista.mostrarFotosNuevas(archivos);
}

// ----- Cancelar (pide confirmación) -----
function preguntarAntesDeCancelar() {
  vista.abrirConfirmacion("Descartar cambios", "Los cambios que hiciste no se guardarán. ¿Quieres salir?", "Sí, descartar", true);
}

function irAlPanel() {
  window.location.href = "ordenes.html";
}

function configurarEventos() {
  const el = vista.elementos;
  el.formulario.addEventListener("submit", guardar);
  el.botonSubir.addEventListener("click", abrirSelectorDeFotos);
  el.fotos.addEventListener("change", alCambiarFotos);
  el.botonCancelar.addEventListener("click", preguntarAntesDeCancelar);
  el.confirmarAceptar.addEventListener("click", irAlPanel);
  el.confirmarCancelar.addEventListener("click", vista.cerrarConfirmacion);
}

function iniciar() {
  const orden = buscarOrdenPorNumero(numeroDeOrden);
  if (orden === null) {
    vista.mostrarOrdenNoEncontrada(); // la orden no existe (o fue eliminada)
    return;
  }
  vista.mostrarOrden(orden, resumirEvidencias(orden.evidencias));
  configurarEventos();
}

iniciar();
