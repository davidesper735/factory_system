// CONTROLADOR (estado y detalle): escucha los clics de los botones y muestra el aviso en la página.
import * as modelo from "../models/clienteModel.js";
import * as vista from "../views/clienteView.js";

function mostrarAviso(evento) {
  const accion = evento.currentTarget.dataset.accion; // "detalle" o "whatsapp"
  vista.mostrarMensaje(modelo.obtenerMensaje(accion), "info");
  vista.irAlInicio();
}

vista.elementos.botones.forEach((boton) => boton.addEventListener("click", mostrarAviso));
