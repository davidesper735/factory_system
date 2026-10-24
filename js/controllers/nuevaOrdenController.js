// CONTROLADOR de nueva orden: CREATE del CRUD.
// Escucha los eventos de la página y le pide trabajo al modelo y a la vista.
import { crearOrden } from "../models/ordenesModel.js";
import { normalizarDatosFormulario, construirEvidencias, validarFotos } from "../models/ordenFormModel.js";
import * as vista from "../views/nuevaOrdenView.js";
import { validarFormularioOrden } from "./validacionOrden.js";

// Se ejecuta cuando se pulsa "Guardar"
function guardar(evento) {
  evento.preventDefault(); // evita que la página se recargue
  if (validarFormularioOrden(vista) === false) {
    return; // hay errores: no se guarda
  }
  const datos = normalizarDatosFormulario(vista.obtenerDatos());
  const evidencias = construirEvidencias(vista.elementos.fotos.files);
  const orden = crearOrden(datos, evidencias);
  window.location.href = "ordenes.html?creada=" + orden.numero; // va al panel
}

// ----- Fotos -----
function revisarFotos(archivos) {
  vista.mostrarErrorFotos(validarFotos(archivos));
  vista.mostrarResumenFotos(archivos);
}

function alCambiarFotos() {
  revisarFotos(vista.elementos.fotos.files);
}

function alArrastrarSobreLaZona(evento) {
  evento.preventDefault(); // necesario para permitir soltar archivos
  vista.marcarZona(true);
}

function alSalirDeLaZona() {
  vista.marcarZona(false);
}

function alSoltarFotos(evento) {
  evento.preventDefault();
  vista.marcarZona(false);
  vista.elementos.fotos.files = evento.dataTransfer.files;
  revisarFotos(vista.elementos.fotos.files);
}

// ----- Cancelar (pide confirmación) -----
function preguntarAntesDeCancelar() {
  vista.abrirConfirmacion("Cancelar la orden", "Se perderán los datos que escribiste. ¿Quieres salir?", "Sí, salir", true);
}

function irAlPanel() {
  window.location.href = "ordenes.html";
}

function iniciar() {
  const el = vista.elementos;
  vista.establecerFechaDeHoy();

  el.formulario.addEventListener("submit", guardar);
  el.fotos.addEventListener("change", alCambiarFotos);
  el.zonaFotos.addEventListener("dragover", alArrastrarSobreLaZona);
  el.zonaFotos.addEventListener("dragleave", alSalirDeLaZona);
  el.zonaFotos.addEventListener("drop", alSoltarFotos);

  el.botonCancelar.addEventListener("click", preguntarAntesDeCancelar);
  el.confirmarAceptar.addEventListener("click", irAlPanel);
  el.confirmarCancelar.addEventListener("click", vista.cerrarConfirmacion);
}

iniciar();
