// CONTROLADOR de "Estado de tu equipo": busca la orden y le pide a la vista que la muestre.
import { buscarOrdenPorNumero } from "../models/ordenesModel.js";
import * as progreso from "../models/progresoModel.js";
import { leerParametro } from "../utils/url.js";
import * as vista from "../views/estadoView.js";

function iniciar() {
  const orden = buscarOrdenPorNumero(leerParametro("orden")); // estado-equipo.html?orden=123
  if (orden === null) {
    vista.mostrarOrdenNoEncontrada();
    return;
  }
  vista.mostrarEstado({
    orden: orden,
    pasos: progreso.construirPasos(orden),
    ultimaActualizacion: progreso.ultimaActualizacion(orden),
    notaActual: progreso.notaDelEstadoActual(orden),
    notaProgreso: progreso.notaDeProgresoCliente(orden),
    avisoCliente: progreso.avisoParaCliente(orden),
  });
}

iniciar();
