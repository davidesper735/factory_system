// VISTA (JS) de nueva orden: lo compartido está en ordenFormView.js
import { mostrarErrores, mostrarErrorFotos } from "./ordenFormView.js";
export * from "./ordenFormView.js";

const porId = (id) => document.getElementById(id);

export const elementos = {
  formulario: porId("form-orden"),
  fotos: porId("fotos"),
  zonaFotos: porId("zona-fotos"),
  botonCancelar: porId("boton-cancelar"),
  confirmarAceptar: porId("confirmar-aceptar"),
  confirmarCancelar: porId("confirmar-cancelar"),
};

export function mostrarResumenFotos(archivos) {
  porId("resumen-fotos").textContent = archivos.length > 0
    ? archivos.length + " foto(s) seleccionada(s)"
    : "Arrastra tus fotos aquí o selecciona archivos";
}

export function marcarZona(activa) {
  elementos.zonaFotos.classList.toggle("zona-fotos--activa", activa);
}

export function limpiarFormulario() {
  elementos.formulario.reset();
  mostrarErrores({});
  mostrarErrorFotos("");
  mostrarResumenFotos([]);
}
