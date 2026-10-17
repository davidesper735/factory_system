// CONTROLADOR: escucha el envío del formulario y coordina modelo y vista.
import * as modelo from "../models/ordenModel.js";
import * as vista from "../views/consultaView.js";

function enviarFormulario(evento) {
  evento.preventDefault(); // evita que la página se recargue

  const datos = vista.obtenerDatos();
  const errores = modelo.validarConsulta(datos.cedula, datos.orden);
  vista.mostrarErrores(errores);
  vista.mostrarMensaje("", "error");

  if (Object.keys(errores).length > 0) return; // hay errores: no seguimos

  const orden = modelo.buscarOrden(datos.cedula, datos.orden);
  if (!orden) {
    vista.mostrarMensaje("No encontramos una orden con esos datos. Revisa la cédula y el número de orden.", "error");
    return;
  }
  vista.mostrarMensaje("Orden #" + orden.numero + " · " + orden.equipo + ": " + orden.estado + ".", "exito");
}

vista.elementos.formulario.addEventListener("submit", enviarFormulario);
