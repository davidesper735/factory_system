// VISTA (JS) de nueva orden: lo que comparte con "editar" está en ordenFormView.js
import { porId } from "../utils/dom.js";
export * from "./ordenFormView.js";

export const elementos = {
  formulario: porId("form-orden"),
  fotos: porId("fotos"),
  zonaFotos: porId("zona-fotos"),
  botonCancelar: porId("boton-cancelar"),
  confirmarAceptar: porId("confirmar-aceptar"),
  confirmarCancelar: porId("confirmar-cancelar"),
};

export function mostrarResumenFotos(archivos) {
  if (archivos.length > 0) {
    porId("resumen-fotos").textContent = archivos.length + " foto(s) seleccionada(s)";
  } else {
    porId("resumen-fotos").textContent = "Arrastra tus fotos aquí o selecciona archivos";
  }
}

export function marcarZona(activa) {
  if (activa) {
    elementos.zonaFotos.classList.add("zona-fotos--activa");
  } else {
    elementos.zonaFotos.classList.remove("zona-fotos--activa");
  }
}
