// CONTROLADOR: escucha los eventos del formulario de edición.
import * as modelo from "../models/ordenFormModel.js";
import * as vista from "../views/editarOrdenView.js";

const NUMERO_ORDEN = "#123"; // orden de ejemplo

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

  vista.mostrarMensaje("Cambios guardados en la orden " + NUMERO_ORDEN + ". (En esta entrega los datos aún no se guardan.)", "exito");
  vista.irAlInicio();
}

function revisarFotos(archivos) {
  vista.mostrarErrorFotos(modelo.validarFotos(archivos));
  vista.mostrarFotosNuevas(archivos);
}

function iniciar() {
  const el = vista.elementos;
  el.formulario.addEventListener("submit", guardar);

  // "Subir más fotos" abre el selector de archivos
  el.botonSubir.addEventListener("click", () => el.fotos.click());
  el.fotos.addEventListener("change", () => revisarFotos(el.fotos.files));

  // Cancelar pide confirmación antes de salir
  el.botonCancelar.addEventListener("click", () => {
    vista.abrirConfirmacion("Descartar cambios", "Los cambios que hiciste no se guardarán. ¿Quieres salir?", "Sí, descartar", true);
  });
  el.confirmarAceptar.addEventListener("click", () => {
    window.location.href = "ordenes.html";
  });
  el.confirmarCancelar.addEventListener("click", vista.cerrarConfirmacion);
}

iniciar();
