// CONTROLADOR: escucha los eventos del formulario y coordina modelo y vista.
import * as modelo from "../models/ordenFormModel.js";
import * as vista from "../views/nuevaOrdenView.js";

function guardar(evento) {
  evento.preventDefault(); // evita que la página se recargue

  const errores = modelo.validarOrden(vista.obtenerDatos());
  const errorFotos = modelo.validarFotos(vista.elementos.fotos.files);
  vista.mostrarErrores(errores);
  vista.mostrarErrorFotos(errorFotos);
  vista.mostrarResumenErrores(errores);
  vista.mostrarMensaje("", "exito"); // oculta el aviso anterior

  if (Object.keys(errores).length > 0 || errorFotos !== "") {
    vista.irAlInicio(); // para ver el aviso rojo
    vista.enfocarPrimerError(errores);
    return; // hay errores: no seguimos
  }

  vista.mostrarMensaje("Orden guardada correctamente. (En esta entrega los datos aún no se guardan.)", "exito");
  vista.limpiarFormulario();
  vista.irAlInicio();
}

function revisarFotos(archivos) {
  vista.mostrarErrorFotos(modelo.validarFotos(archivos));
  vista.mostrarResumenFotos(archivos);
}

function soltarFotos(evento) {
  evento.preventDefault();
  vista.marcarZona(false);
  vista.elementos.fotos.files = evento.dataTransfer.files;
  revisarFotos(vista.elementos.fotos.files);
}

function iniciar() {
  const el = vista.elementos;
  el.formulario.addEventListener("submit", guardar);

  el.fotos.addEventListener("change", () => revisarFotos(el.fotos.files));
  el.zonaFotos.addEventListener("dragover", (evento) => {
    evento.preventDefault(); // necesario para permitir soltar archivos
    vista.marcarZona(true);
  });
  el.zonaFotos.addEventListener("dragleave", () => vista.marcarZona(false));
  el.zonaFotos.addEventListener("drop", soltarFotos);

  // Cancelar pide confirmación antes de salir
  el.botonCancelar.addEventListener("click", () => {
    vista.abrirConfirmacion("Cancelar la orden", "Se perderán los datos que escribiste. ¿Quieres salir?", "Sí, salir", true);
  });
  el.confirmarAceptar.addEventListener("click", () => {
    window.location.href = "ordenes.html";
  });
  el.confirmarCancelar.addEventListener("click", vista.cerrarConfirmacion);
}

iniciar();
