// CONTROLADOR de nueva orden: CREATE del CRUD.
import { crearOrden } from "../models/ordenesModel.js";
import { normalizarDatosFormulario, construirEvidencias, validarFotos } from "../models/ordenFormModel.js";
import * as vista from "../views/nuevaOrdenView.js";
import { validarFormularioOrden } from "./validacionOrden.js";

function guardar(evento) {
  evento.preventDefault(); // evita que la página se recargue
  if (!validarFormularioOrden(vista)) return;

  const datos = normalizarDatosFormulario(vista.obtenerDatos());
  const evidencias = construirEvidencias(vista.elementos.fotos.files);
  const orden = crearOrden(datos, evidencias);
  window.location.href = "ordenes.html?creada=" + orden.numero;
}

function revisarFotos(archivos) {
  vista.mostrarErrorFotos(validarFotos(archivos));
  vista.mostrarResumenFotos(archivos);
}

function soltarFotos(evento) {
  evento.preventDefault();
  vista.marcarZona(false);
  vista.elementos.fotos.files = evento.dataTransfer.files;
  revisarFotos(vista.elementos.fotos.files);
}

function configurarFotos() {
  const el = vista.elementos;
  el.fotos.addEventListener("change", () => revisarFotos(el.fotos.files));
  el.zonaFotos.addEventListener("dragover", (evento) => {
    evento.preventDefault(); // necesario para permitir soltar archivos
    vista.marcarZona(true);
  });
  el.zonaFotos.addEventListener("dragleave", () => vista.marcarZona(false));
  el.zonaFotos.addEventListener("drop", soltarFotos);
}

function configurarCancelar() {
  const el = vista.elementos;
  el.botonCancelar.addEventListener("click", () => {
    vista.abrirConfirmacion("Cancelar la orden", "Se perderán los datos que escribiste. ¿Quieres salir?", "Sí, salir", true);
  });
  el.confirmarAceptar.addEventListener("click", () => (window.location.href = "ordenes.html"));
  el.confirmarCancelar.addEventListener("click", vista.cerrarConfirmacion);
}

function iniciar() {
  vista.establecerFechaDeHoy();
  vista.elementos.formulario.addEventListener("submit", guardar);
  configurarFotos();
  configurarCancelar();
}

iniciar();
