// CONTROLADOR (estado y detalle): escucha los clics de los botones y muestra el aviso en la página.
import * as modelo from "../models/clienteModel.js";
import * as vista from "../views/clienteView.js";

function mostrarAviso(evento) {
  const accion = evento.currentTarget.dataset.accion; // por ejemplo "whatsapp"
  vista.mostrarMensaje(modelo.obtenerMensaje(accion), "info");
  vista.irAlInicio();
}

for (const boton of vista.elementos.botones) {
  boton.addEventListener("click", mostrarAviso);
}
