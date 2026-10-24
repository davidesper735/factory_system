// VISTA (JS) de editar orden: lo que comparte con "nueva orden" está en ordenFormView.js
import { porId, rellenarCampos, actualizarInsignias, mostrarContenidoDeOrden } from "../utils/dom.js";
import { buscarEstado } from "../data/estados.js";
import { renderizarFotos } from "./fotosView.js";
import { rellenarFormulario } from "./ordenFormView.js";
export * from "./ordenFormView.js";
export { mostrarOrdenNoEncontrada } from "../utils/dom.js";

export const elementos = {
  formulario: porId("form-orden"),
  fotos: porId("fotos"),
  botonSubir: porId("boton-subir"),
  botonCancelar: porId("boton-cancelar"),
  confirmarAceptar: porId("confirmar-aceptar"),
  confirmarCancelar: porId("confirmar-cancelar"),
};

// Muestra la orden: título, estado, campos del formulario y fotos ya adjuntas
export function mostrarOrden(orden, resumenFotos) {
  document.title = "Editar orden #" + orden.numero + " | Factory System";
  rellenarCampos({ numero: orden.numero, resumenFotos: resumenFotos });
  actualizarInsignias(buscarEstado(orden.estado));
  rellenarFormulario(orden);
  renderizarFotos(porId("lista-fotos"), orden.evidencias);
  mostrarContenidoDeOrden();
}

// Indica cuántas fotos nuevas se van a subir (junto a las ya adjuntas)
export function mostrarFotosNuevas(archivos) {
  if (archivos.length > 0) {
    porId("fotos-nuevas").textContent = " · " + archivos.length + " nueva(s) por subir";
  } else {
    porId("fotos-nuevas").textContent = "";
  }
}
