// VISTA (JS) de editar orden: lo compartido está en ordenFormView.js
export * from "./ordenFormView.js";

const porId = (id) => document.getElementById(id);

export const elementos = {
  formulario: porId("form-orden"),
  fotos: porId("fotos"),
  botonSubir: porId("boton-subir"),
  botonCancelar: porId("boton-cancelar"),
  confirmarAceptar: porId("confirmar-aceptar"),
  confirmarCancelar: porId("confirmar-cancelar"),
};

// Indica cuántas fotos nuevas se van a subir (junto a las ya adjuntas)
export function mostrarFotosNuevas(archivos) {
  porId("fotos-nuevas").textContent = archivos.length > 0 ? " · " + archivos.length + " nueva(s) por subir" : "";
}
